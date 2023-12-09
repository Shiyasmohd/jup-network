// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NetState {
    address public admin;

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
        string bio;
        string licenseId;
        bool isVerified;
        string[] tags;
        uint256 level;
    }

    struct Dispute {
        uint256 disputeId;
        address party1;
        string summary;
        string tag;
        string evidenceDoc;
        address party2;
        string replyEvidenceDoc;
        DisputeStatus status;
        uint256 judgeId;
        string decisionByJudge;
    }

    mapping(uint256 => Dispute) public disputes;
    uint256 public disputeCounter;
    uint256 public judgeCounter;
    mapping(uint256 => Judge) public judges;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    modifier onlyJudge(uint256 _disputeId, uint256 _judgeId) {
        require(
            _judgeId == disputes[_disputeId].judgeId,
            "Only the assigned judge can call this function"
        );
        _;
    }
    event DisputeInitiated(
        uint256 indexed disputeId,
        address indexed party1,
        address indexed party2
    );
    event JudgeRegistered(uint256 indexed judgeId, string licenseId);
    event JudgeVerified(uint256 indexed judgeId);
    event JudgeLevelUpdated(uint256 indexed judgeId, uint256 newLevel);
    event JudgeAssigned(uint256 indexed disputeId, uint256 indexed judgeId);
    event DecisionMade(uint256 indexed disputeId, string decision);

    constructor() {
        admin = msg.sender;
    }

    function registerJudge(
        string memory _bio,
        string memory _licenseId,
        string[] memory _tags
    ) external {
        judgeCounter++;
        judges[judgeCounter] = Judge({
            judgeId: judgeCounter,
            bio: _bio,
            licenseId: _licenseId,
            isVerified: false,
            tags: _tags,
            level: 0
        });

        emit JudgeRegistered(judgeCounter, _licenseId);
    }

    function verifyJudge(uint256 _judgeId) external onlyAdmin {
        require(!judges[_judgeId].isVerified, "Judge is already verified");
        judges[_judgeId].isVerified = true;
        judges[_judgeId].level = 1;

        emit JudgeVerified(_judgeId);
    }

    function updateJudgeLevel(uint256 _judgeId, uint256 _newLevel)
        external
        onlyAdmin
    {
        require(judges[_judgeId].isVerified, "Judge is not verified");
        judges[_judgeId].level = _newLevel;

        emit JudgeLevelUpdated(_judgeId, _newLevel);
    }

    function getJudgesByStatus(bool _isVerified)
        external
        view
        returns (Judge[] memory)
    {
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

    function getJudgesByLevel(uint256 _level)
        external
        view
        returns (Judge[] memory)
    {
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

    function getJudgesByTags(string[] memory _tags)
        external
        view
        returns (Judge[] memory)
    {
        uint256 count;
        Judge[] memory result = new Judge[](judgeCounter);

        for (uint256 i = 1; i <= judgeCounter; i++) {
            if (hasCommonTag(judges[i].tags, _tags)) {
                result[count] = judges[i];
                count++;
            }
        }
        return result;
    }

    function hasCommonTag(string[] memory _tagsA, string[] memory _tagsB)
        internal
        pure
        returns (bool)
    {
        for (uint256 i = 0; i < _tagsA.length; i++) {
            for (uint256 j = 0; j < _tagsB.length; j++) {
                if (
                    keccak256(abi.encodePacked(_tagsA[i])) ==
                    keccak256(abi.encodePacked(_tagsB[j]))
                ) {
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

    //fn for SettleDispute
    function initiateDispute(
        string memory _summary,
        string memory _tag,
        string memory _evidenceDoc,
        address _party2
    ) external {
        disputeCounter++;
        disputes[disputeCounter] = Dispute({
            disputeId: disputeCounter,
            party1: msg.sender,
            summary: _summary,
            tag: _tag,
            evidenceDoc: _evidenceDoc,
            party2: _party2,
            replyEvidenceDoc: "",
            status: DisputeStatus.Initiated,
            judgeId: 0,
            decisionByJudge: ""
        });

        emit DisputeInitiated(disputeCounter, msg.sender, _party2);
    }

    function replyToDispute(uint256 _disputeId, string memory _replyEvidenceDoc)
        external
    {
        require(
            disputes[_disputeId].status == DisputeStatus.Initiated,
            "Dispute is not in the correct status"
        );
        disputes[_disputeId].replyEvidenceDoc = _replyEvidenceDoc;
        disputes[_disputeId].status = DisputeStatus.Reply;
    }

    function assignJudgeToDispute(uint256 _disputeId, uint256 _judgeId)
        external
        onlyAdmin
    {
        require(
            disputes[_disputeId].status == DisputeStatus.Reply,
            "Dispute not in the correct status"
        );
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

    function getDetailsOfDispute(uint256 _disputeId)
        external
        view
        returns (Dispute memory)
    {
        require(_disputeId <= disputeCounter, "Invalid dispute ID");
        return disputes[_disputeId];
    }

    function getDisputesByParty(address _party)
        external
        view
        returns (Dispute[] memory)
    {
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

    function getDisputesOfAJudge(uint256 _judgeId)
        external
        view
        returns (Dispute[] memory)
    {
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

    function getDisputesByTag(string memory _tag)
        external
        view
        returns (Dispute[] memory)
    {
        uint256 count;
        Dispute[] memory result = new Dispute[](disputeCounter);

        for (uint256 i = 1; i <= disputeCounter; i++) {
            if (
                keccak256(abi.encodePacked(disputes[i].tag)) ==
                keccak256(abi.encodePacked(_tag))
            ) {
                result[count] = disputes[i];
                count++;
            }
        }
        return result;
    }

    function makeDecision(uint256 _disputeId, string memory _decision)
        external
        onlyJudge(_disputeId, disputes[_disputeId].judgeId)
    {
        require(
            disputes[_disputeId].status == DisputeStatus.Hearing,
            "Dispute not in the correct status"
        );

        disputes[_disputeId].status = DisputeStatus.Decision;
        disputes[_disputeId].decisionByJudge = _decision;

        emit DecisionMade(_disputeId, _decision);
    }
}
