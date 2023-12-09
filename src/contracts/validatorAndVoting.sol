// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NetState {
    address public admin;
    uint256 public constant STAKE_AMOUNT = 500000000000000; // 0.0005 ETH (5 dollars)

    enum DisputeStatus {
        Initiated,
        Reply,
        Hearing,
        Decision,
        Adjudication,
        Enforcement
    }

    struct Judge {
        uint256 judgeId;
        string name;
        string bio;
        string licenseId;
        bool isVerified;
        string[] tags;
        uint256 level;
    }

    struct Dispute {
        uint256 disputeId;
        address party1;
        string party1name;
        string summary;
        string tag;
        string evidenceDoc;
        address party2;
        string party2name;
        string replyEvidenceDoc;
        DisputeStatus status;
        uint256 judgeId;
        string decisionByJudge;
    }

    struct ValidatorApplication {
        address validatorAddress;
        uint256 stakedAmount;
        bool isApplied;
    }

    mapping(uint256 => Dispute) public disputes;
    uint256 public disputeCounter;
    uint256 public judgeCounter;
    mapping(uint256 => Judge) public judges;
    mapping(address => ValidatorApplication) public validatorApplications;
    address[] public activeValidators;
    uint256 public contractBalance;
    mapping(uint256 => bool) public judgeVerificationStatus;
    mapping(uint256 => uint256) public positiveVotes;
    mapping(uint256 => uint256) public negativeVotes;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    modifier onlyJudge(uint256 _disputeId, uint256 _judgeId) {
        require(_judgeId == disputes[_disputeId].judgeId, "Only the assigned judge can call this function");
        _;
    }

    event DisputeInitiated(uint256 indexed disputeId, address indexed party1, address indexed party2);
    event JudgeRegistered(uint256 indexed judgeId, string name, string licenseId);
    event JudgeLevelUpdated(uint256 indexed judgeId, uint256 newLevel);
    event JudgeAssigned(uint256 indexed disputeId, uint256 indexed judgeId);
    event DecisionMade(uint256 indexed disputeId, string decision);
    event JudgeVerified(uint256 indexed judgeId);
    event VerificationProcessInitiated(uint256 indexed judgeId, address[] validators);

    constructor() {
        admin = msg.sender;
    }

    function applyValidator() external {
        require(!validatorApplications[msg.sender].isApplied, "Validator already applied");
        validatorApplications[msg.sender] = ValidatorApplication({ validatorAddress: msg.sender, stakedAmount: 0, isApplied: true });
        activeValidators.push(msg.sender);
    }

    // function stakeForVerification(uint256 _disputeId) external payable {
    //     require(msg.value == STAKE_AMOUNT, "Incorrect staked amount");
    //     require(disputes[_disputeId].status == DisputeStatus.Initiated, "Dispute not in the correct status");
    //     require(validatorApplications[msg.sender].isApplied, "Validator not applied");

    //     validatorApplications[msg.sender].stakedAmount += msg.value;
    //     contractBalance += msg.value;
    // }

    function getRandomValidators(uint256 _disputeId) internal view returns (address[] memory) {
        uint256 numberOfValidatorsToSelect = 3;
        uint256 startIndex = _disputeId % activeValidators.length;

        address[] memory selectedValidators = new address[](numberOfValidatorsToSelect);

        for (uint256 i = 0; i < numberOfValidatorsToSelect; i++) {
            uint256 index = (startIndex + i) % activeValidators.length;
            selectedValidators[i] = activeValidators[index];
        }

        return selectedValidators;
    }

    function registerJudgeForVerification(string memory _name, string memory _bio, string memory _licenseId, string[] memory _tags) external {
        judgeCounter++;
        judges[judgeCounter] = Judge({ judgeId: judgeCounter, name: _name, bio: _bio, licenseId: _licenseId, isVerified: false, tags: _tags, level: 0 });

        emit JudgeRegistered(judgeCounter, _name, _licenseId);

        initiateVerificationProcess(judgeCounter);
    }

    function initiateVerificationProcess(uint256 _judgeId) internal {
        require(_judgeId <= judgeCounter, "Invalid judge ID");
        require(!judges[_judgeId].isVerified, "Judge is already verified");

        judgeVerificationStatus[_judgeId] = true;
        address[] memory selectedValidators = getRandomValidators(_judgeId);

        emit VerificationProcessInitiated(_judgeId, selectedValidators);
    }

    function voteForJudgeVerification(uint256 _judgeId, bool _vote) external {
        require(judgeVerificationStatus[_judgeId], "Judge is not awaiting verification");

        if (_vote) {
            positiveVotes[_judgeId]++;
        } else {
            negativeVotes[_judgeId]++;
        }

        if (positiveVotes[_judgeId] > activeValidators.length / 2) {
            judges[_judgeId].isVerified = true;
            emit JudgeVerified(_judgeId);
            judgeVerificationStatus[_judgeId] = false;
            positiveVotes[_judgeId] = 0;
            negativeVotes[_judgeId] = 0;
        }
    }

    function updateJudgeLevel(uint256 _judgeId, uint256 _newLevel) external onlyAdmin {
        require(judges[_judgeId].isVerified, "Judge is not verified");
        judges[_judgeId].level = _newLevel;

        emit JudgeLevelUpdated(_judgeId, _newLevel);
    }

    function getJudgesByStatus(bool _isVerified) external view returns (Judge[] memory) {
        uint256 count;
        Judge[] memory result = new Judge[](judgeCounter);

        for (uint256 i = 1; i <= judgeCounter; i++) {
            if (judges[i].isVerified == _isVerified) {
                result[count] = judges[i];
                count++;
            }
        }
        return result;
    }

    function getJudgesByLevel(uint256 _level) external view returns (Judge[] memory) {
        uint256 count;
        Judge[] memory result = new Judge[](judgeCounter);

        for (uint256 i = 1; i <= judgeCounter; i++) {
            if (judges[i].level == _level) {
                result[count] = judges[i];
                count++;
            }
        }
        return result;
    }

    function getJudgesByTags(string[] memory _tags) external view returns (Judge[] memory) {
        uint256 count;
        Judge[] memory result = new Judge[](judgeCounter);

        for (uint256 i = 1; i<= judgeCounter; i++) {
            if (hasCommonTag(judges[i].tags, _tags)) {
                result[count] = judges[i];
                count++;
            }
        }
        return result;
    }

    function hasCommonTag(string[] memory _tagsA, string[] memory _tagsB) internal pure returns (bool) {
        for (uint256 i = 0; i < _tagsA.length; i++) {
            for (uint256 j = 0; j < _tagsB.length; j++) {
                if (keccak256(abi.encodePacked(_tagsA[i])) == keccak256(abi.encodePacked(_tagsB[j]))) {
                    return true;
                }
            }
        }
        return false;
    }

    function getAllJudges() external view returns (Judge[] memory) {
        Judge[] memory allJudges = new Judge[](judgeCounter);
        for (uint256 i = 1; i <= judgeCounter; i++) {
            allJudges[i - 1] = judges[i];
        }
        return allJudges;
    }

    function initiateDispute(string memory _party1name, string memory _summary, string memory _tag, string memory _evidenceDoc, address _party2, string memory _party2name) external {
        disputeCounter++;
        disputes[disputeCounter] = Dispute({
            disputeId: disputeCounter,
            party1: msg.sender,
            party1name: _party1name,
            summary: _summary,
            tag: _tag,
            evidenceDoc: _evidenceDoc,
            party2: _party2,
            party2name: _party2name,
            replyEvidenceDoc: "",
            status: DisputeStatus.Initiated,
            judgeId: 0,
            decisionByJudge: ""
        });

        emit DisputeInitiated(disputeCounter, msg.sender, _party2);
    }

    function replyToDispute(uint256 _disputeId, string memory _replyEvidenceDoc) external {
        require(disputes[_disputeId].status == DisputeStatus.Initiated, "Dispute is not in the correct status");
        disputes[_disputeId].replyEvidenceDoc = _replyEvidenceDoc;
        disputes[_disputeId].status = DisputeStatus.Reply;
    }

    function assignJudgeToDispute(uint256 _disputeId, uint256 _judgeId) external onlyAdmin {
        require(disputes[_disputeId].status == DisputeStatus.Reply, "Dispute not in the correct status");
        require(judges[_judgeId].isVerified, "Judge is not verified");

        disputes[_disputeId].judgeId = _judgeId;
        disputes[_disputeId].status = DisputeStatus.Hearing;

        emit JudgeAssigned(_disputeId, _judgeId);
    }

    function getAllDisputes() external view returns (Dispute[] memory) {
        Dispute[] memory allDisputes = new Dispute[](disputeCounter);
        for (uint256 i = 1; i <= disputeCounter; i++) {
            allDisputes[i - 1] = disputes[i];
        }
        return allDisputes;
    }

    function getDetailsOfDispute(uint256 _disputeId) external view returns (Dispute memory) {
        require(_disputeId <= disputeCounter, "Invalid dispute ID");
        return disputes[_disputeId];
    }

    function getDisputesByParty(address _party) external view returns (Dispute[] memory) {
        uint256 count;
        Dispute[] memory result = new Dispute[](disputeCounter);

        for (uint256 i = 1; i <= disputeCounter; i++) {
            if (disputes[i].party1 == _party || disputes[i].party2 == _party) {
                result[count] = disputes[i];
                count++;
            }
        }
        return result;
    }

    function getDisputesOfAJudge(uint256 _judgeId) external view returns (Dispute[] memory) {
        uint256 count;
        Dispute[] memory result = new Dispute[](disputeCounter);

        for (uint256 i = 1; i <= disputeCounter; i++) {
            if (disputes[i].judgeId == _judgeId) {
                result[count] = disputes[i];
                count++;
            }
        }
        return result;
    }

    function getDisputesByTag(string memory _tag) external view returns (Dispute[] memory) {
        uint256 count;
        Dispute[] memory result = new Dispute[](disputeCounter);

        for (uint256 i = 1; i <= disputeCounter; i++) {
            if (keccak256(abi.encodePacked(disputes[i].tag)) == keccak256(abi.encodePacked(_tag))) {
                result[count] = disputes[i];
                count++;
            }
        }
        return result;
    }

    function makeDecision(uint256 _disputeId, string memory _decision) external onlyJudge(_disputeId, disputes[_disputeId].judgeId) {
        require(disputes[_disputeId].status == DisputeStatus.Hearing, "Dispute not in the correct status");

        disputes[_disputeId].status = DisputeStatus.Decision;
        disputes[_disputeId].decisionByJudge = _decision;

        emit DecisionMade(_disputeId, _decision);
    }
}
