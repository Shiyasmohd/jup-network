export const CONTRACT_ADDRESS = "0x106CB102df762ed8C2FdE2cFAB7f26e60565017E"

export const ABI = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_disputeId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_judgeId",
                "type": "uint256"
            }
        ],
        "name": "assignJudgeToDispute",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "disputeId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "decision",
                "type": "string"
            }
        ],
        "name": "DecisionMade",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "disputeId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "party1",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "party2",
                "type": "address"
            }
        ],
        "name": "DisputeInitiated",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_party1name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_summary",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_tag",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_evidenceDoc",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "_party2",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_party2name",
                "type": "string"
            }
        ],
        "name": "initiateDispute",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "disputeId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "judgeId",
                "type": "uint256"
            }
        ],
        "name": "JudgeAssigned",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "judgeId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newLevel",
                "type": "uint256"
            }
        ],
        "name": "JudgeLevelUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "judgeId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "licenseId",
                "type": "string"
            }
        ],
        "name": "JudgeRegistered",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "judgeId",
                "type": "uint256"
            }
        ],
        "name": "JudgeVerified",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_disputeId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_decision",
                "type": "string"
            }
        ],
        "name": "makeDecision",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_bio",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_licenseId",
                "type": "string"
            },
            {
                "internalType": "string[]",
                "name": "_tags",
                "type": "string[]"
            }
        ],
        "name": "registerJudge",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_disputeId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_replyEvidenceDoc",
                "type": "string"
            }
        ],
        "name": "replyToDispute",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_judgeId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_newLevel",
                "type": "uint256"
            }
        ],
        "name": "updateJudgeLevel",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_judgeId",
                "type": "uint256"
            }
        ],
        "name": "verifyJudge",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "admin",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "disputeCounter",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "disputes",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "disputeId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "party1",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "party1name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "summary",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "tag",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "evidenceDoc",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "party2",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "party2name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "replyEvidenceDoc",
                "type": "string"
            },
            {
                "internalType": "enum NetState.DisputeStatus",
                "name": "status",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "judgeId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "decisionByJudge",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllDisputes",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "disputeId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "party1",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "party1name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "summary",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "tag",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "evidenceDoc",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "party2",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "party2name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "replyEvidenceDoc",
                        "type": "string"
                    },
                    {
                        "internalType": "enum NetState.DisputeStatus",
                        "name": "status",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint256",
                        "name": "judgeId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "decisionByJudge",
                        "type": "string"
                    }
                ],
                "internalType": "struct NetState.Dispute[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllJudges",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "judgeId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "bio",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "licenseId",
                        "type": "string"
                    },
                    {
                        "internalType": "bool",
                        "name": "isVerified",
                        "type": "bool"
                    },
                    {
                        "internalType": "string[]",
                        "name": "tags",
                        "type": "string[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "level",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct NetState.Judge[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_disputeId",
                "type": "uint256"
            }
        ],
        "name": "getDetailsOfDispute",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "disputeId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "party1",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "party1name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "summary",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "tag",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "evidenceDoc",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "party2",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "party2name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "replyEvidenceDoc",
                        "type": "string"
                    },
                    {
                        "internalType": "enum NetState.DisputeStatus",
                        "name": "status",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint256",
                        "name": "judgeId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "decisionByJudge",
                        "type": "string"
                    }
                ],
                "internalType": "struct NetState.Dispute",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_party",
                "type": "address"
            }
        ],
        "name": "getDisputesByParty",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "disputeId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "party1",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "party1name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "summary",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "tag",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "evidenceDoc",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "party2",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "party2name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "replyEvidenceDoc",
                        "type": "string"
                    },
                    {
                        "internalType": "enum NetState.DisputeStatus",
                        "name": "status",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint256",
                        "name": "judgeId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "decisionByJudge",
                        "type": "string"
                    }
                ],
                "internalType": "struct NetState.Dispute[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_tag",
                "type": "string"
            }
        ],
        "name": "getDisputesByTag",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "disputeId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "party1",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "party1name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "summary",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "tag",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "evidenceDoc",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "party2",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "party2name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "replyEvidenceDoc",
                        "type": "string"
                    },
                    {
                        "internalType": "enum NetState.DisputeStatus",
                        "name": "status",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint256",
                        "name": "judgeId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "decisionByJudge",
                        "type": "string"
                    }
                ],
                "internalType": "struct NetState.Dispute[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_judgeId",
                "type": "uint256"
            }
        ],
        "name": "getDisputesOfAJudge",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "disputeId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "party1",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "party1name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "summary",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "tag",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "evidenceDoc",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "party2",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "party2name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "replyEvidenceDoc",
                        "type": "string"
                    },
                    {
                        "internalType": "enum NetState.DisputeStatus",
                        "name": "status",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint256",
                        "name": "judgeId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "decisionByJudge",
                        "type": "string"
                    }
                ],
                "internalType": "struct NetState.Dispute[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_level",
                "type": "uint256"
            }
        ],
        "name": "getJudgesByLevel",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "judgeId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "bio",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "licenseId",
                        "type": "string"
                    },
                    {
                        "internalType": "bool",
                        "name": "isVerified",
                        "type": "bool"
                    },
                    {
                        "internalType": "string[]",
                        "name": "tags",
                        "type": "string[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "level",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct NetState.Judge[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bool",
                "name": "_isVerified",
                "type": "bool"
            }
        ],
        "name": "getJudgesByStatus",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "judgeId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "bio",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "licenseId",
                        "type": "string"
                    },
                    {
                        "internalType": "bool",
                        "name": "isVerified",
                        "type": "bool"
                    },
                    {
                        "internalType": "string[]",
                        "name": "tags",
                        "type": "string[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "level",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct NetState.Judge[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string[]",
                "name": "_tags",
                "type": "string[]"
            }
        ],
        "name": "getJudgesByTags",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "judgeId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "bio",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "licenseId",
                        "type": "string"
                    },
                    {
                        "internalType": "bool",
                        "name": "isVerified",
                        "type": "bool"
                    },
                    {
                        "internalType": "string[]",
                        "name": "tags",
                        "type": "string[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "level",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct NetState.Judge[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "judgeCounter",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "judges",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "judgeId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "bio",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "licenseId",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "isVerified",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "level",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]