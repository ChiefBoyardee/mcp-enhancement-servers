#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
var stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
var types_js_1 = require("@modelcontextprotocol/sdk/types.js");
// Fixed chalk import for ESM
var chalk_1 = require("chalk");
// Server Classes
var MentalModelServer = /** @class */ (function () {
    function MentalModelServer() {
    }
    MentalModelServer.prototype.validateModelData = function (input) {
        var data = input;
        if (!data.modelName || typeof data.modelName !== 'string') {
            throw new Error('Invalid modelName: must be a string');
        }
        if (!data.problem || typeof data.problem !== 'string') {
            throw new Error('Invalid problem: must be a string');
        }
        return {
            modelName: data.modelName,
            problem: data.problem,
            steps: Array.isArray(data.steps) ? data.steps.map(String) : [],
            reasoning: typeof data.reasoning === 'string' ? data.reasoning : '',
            conclusion: typeof data.conclusion === 'string' ? data.conclusion : ''
        };
    };
    MentalModelServer.prototype.formatModelOutput = function (modelData) {
        var modelName = modelData.modelName, problem = modelData.problem, steps = modelData.steps, reasoning = modelData.reasoning, conclusion = modelData.conclusion;
        var border = '─'.repeat(Math.max(modelName.length + 20, problem.length + 4));
        return "\n\u250C".concat(border, "\u2510\n\u2502 \uD83E\uDDE0 Mental Model: ").concat(modelName.padEnd(border.length - 16), " \u2502\n\u251C").concat(border, "\u2524\n\u2502 Problem: ").concat(problem.padEnd(border.length - 10), " \u2502\n\u251C").concat(border, "\u2524\n\u2502 Steps:").concat(' '.repeat(border.length - 7), " \u2502\n").concat(steps.map(function (step) { return "\u2502 \u2022 ".concat(step.padEnd(border.length - 4), " \u2502"); }).join('\n'), "\n\u251C").concat(border, "\u2524\n\u2502 Reasoning: ").concat(reasoning.padEnd(border.length - 11), " \u2502\n\u251C").concat(border, "\u2524\n\u2502 Conclusion: ").concat(conclusion.padEnd(border.length - 12), " \u2502\n\u2514").concat(border, "\u2518");
    };
    MentalModelServer.prototype.processModel = function (input) {
        try {
            var validatedInput = this.validateModelData(input);
            var formattedOutput = this.formatModelOutput(validatedInput);
            console.error(formattedOutput);
            return {
                content: [{
                        type: "text",
                        text: JSON.stringify({
                            modelName: validatedInput.modelName,
                            status: 'success',
                            hasSteps: validatedInput.steps.length > 0,
                            hasConclusion: !!validatedInput.conclusion
                        }, null, 2)
                    }]
            };
        }
        catch (error) {
            return {
                content: [{
                        type: "text",
                        text: JSON.stringify({
                            error: error instanceof Error ? error.message : String(error),
                            status: 'failed'
                        }, null, 2)
                    }],
                isError: true
            };
        }
    };
    return MentalModelServer;
}());
var DebuggingApproachServer = /** @class */ (function () {
    function DebuggingApproachServer() {
    }
    DebuggingApproachServer.prototype.validateApproachData = function (input) {
        var data = input;
        if (!data.approachName || typeof data.approachName !== 'string') {
            throw new Error('Invalid approachName: must be a string');
        }
        if (!data.issue || typeof data.issue !== 'string') {
            throw new Error('Invalid issue: must be a string');
        }
        return {
            approachName: data.approachName,
            issue: data.issue,
            steps: Array.isArray(data.steps) ? data.steps.map(String) : [],
            findings: typeof data.findings === 'string' ? data.findings : '',
            resolution: typeof data.resolution === 'string' ? data.resolution : ''
        };
    };
    DebuggingApproachServer.prototype.formatApproachOutput = function (approachData) {
        var approachName = approachData.approachName, issue = approachData.issue, steps = approachData.steps, findings = approachData.findings, resolution = approachData.resolution;
        var border = '─'.repeat(Math.max(approachName.length + 25, issue.length + 4));
        return "\n\u250C".concat(border, "\u2510\n\u2502 \uD83D\uDD0D Debugging Approach: ").concat(approachName.padEnd(border.length - 21), " \u2502\n\u251C").concat(border, "\u2524\n\u2502 Issue: ").concat(issue.padEnd(border.length - 8), " \u2502\n\u251C").concat(border, "\u2524\n\u2502 Steps:").concat(' '.repeat(border.length - 7), " \u2502\n").concat(steps.map(function (step) { return "\u2502 \u2022 ".concat(step.padEnd(border.length - 4), " \u2502"); }).join('\n'), "\n\u251C").concat(border, "\u2524\n\u2502 Findings: ").concat(findings.padEnd(border.length - 11), " \u2502\n\u251C").concat(border, "\u2524\n\u2502 Resolution: ").concat(resolution.padEnd(border.length - 12), " \u2502\n\u2514").concat(border, "\u2518");
    };
    DebuggingApproachServer.prototype.processApproach = function (input) {
        try {
            var validatedInput = this.validateApproachData(input);
            var formattedOutput = this.formatApproachOutput(validatedInput);
            console.error(formattedOutput);
            return {
                content: [{
                        type: "text",
                        text: JSON.stringify({
                            approachName: validatedInput.approachName,
                            status: 'success',
                            hasSteps: validatedInput.steps.length > 0,
                            hasResolution: !!validatedInput.resolution
                        }, null, 2)
                    }]
            };
        }
        catch (error) {
            return {
                content: [{
                        type: "text",
                        text: JSON.stringify({
                            error: error instanceof Error ? error.message : String(error),
                            status: 'failed'
                        }, null, 2)
                    }],
                isError: true
            };
        }
    };
    return DebuggingApproachServer;
}());
var SequentialThinkingServer = /** @class */ (function () {
    function SequentialThinkingServer() {
        this.thoughtHistory = [];
        this.branches = {};
    }
    SequentialThinkingServer.prototype.validateThoughtData = function (input) {
        var data = input;
        if (!data.thought || typeof data.thought !== 'string') {
            throw new Error('Invalid thought: must be a string');
        }
        if (!data.thoughtNumber || typeof data.thoughtNumber !== 'number') {
            throw new Error('Invalid thoughtNumber: must be a number');
        }
        if (!data.totalThoughts || typeof data.totalThoughts !== 'number') {
            throw new Error('Invalid totalThoughts: must be a number');
        }
        if (typeof data.nextThoughtNeeded !== 'boolean') {
            throw new Error('Invalid nextThoughtNeeded: must be a boolean');
        }
        return {
            thought: data.thought,
            thoughtNumber: data.thoughtNumber,
            totalThoughts: data.totalThoughts,
            nextThoughtNeeded: data.nextThoughtNeeded,
            isRevision: data.isRevision,
            revisesThought: data.revisesThought,
            branchFromThought: data.branchFromThought,
            branchId: data.branchId,
            needsMoreThoughts: data.needsMoreThoughts,
        };
    };
    SequentialThinkingServer.prototype.formatThought = function (thoughtData) {
        var thoughtNumber = thoughtData.thoughtNumber, totalThoughts = thoughtData.totalThoughts, thought = thoughtData.thought, isRevision = thoughtData.isRevision, revisesThought = thoughtData.revisesThought, branchFromThought = thoughtData.branchFromThought, branchId = thoughtData.branchId;
        var prefix = '';
        var context = '';
        if (isRevision) {
            prefix = chalk_1.default.yellow('🔄 Revision');
            context = " (revising thought ".concat(revisesThought, ")");
        }
        else if (branchFromThought) {
            prefix = chalk_1.default.green('🌿 Branch');
            context = " (from thought ".concat(branchFromThought, ", ID: ").concat(branchId, ")");
        }
        else {
            prefix = chalk_1.default.blue('💭 Thought');
            context = '';
        }
        var header = "".concat(prefix, " ").concat(thoughtNumber, "/").concat(totalThoughts).concat(context);
        var border = '─'.repeat(Math.max(header.length, thought.length) + 4);
        return "\n\u250C".concat(border, "\u2510\n\u2502 ").concat(header, " \u2502\n\u251C").concat(border, "\u2524\n\u2502 ").concat(thought.padEnd(border.length - 2), " \u2502\n\u2514").concat(border, "\u2518");
    };
    SequentialThinkingServer.prototype.processThought = function (input) {
        try {
            var validatedInput = this.validateThoughtData(input);
            if (validatedInput.thoughtNumber > validatedInput.totalThoughts) {
                validatedInput.totalThoughts = validatedInput.thoughtNumber;
            }
            this.thoughtHistory.push(validatedInput);
            if (validatedInput.branchFromThought && validatedInput.branchId) {
                if (!this.branches[validatedInput.branchId]) {
                    this.branches[validatedInput.branchId] = [];
                }
                this.branches[validatedInput.branchId].push(validatedInput);
            }
            var formattedThought = this.formatThought(validatedInput);
            console.error(formattedThought);
            return {
                content: [{
                        type: "text",
                        text: JSON.stringify({
                            thoughtNumber: validatedInput.thoughtNumber,
                            totalThoughts: validatedInput.totalThoughts,
                            nextThoughtNeeded: validatedInput.nextThoughtNeeded,
                            branches: Object.keys(this.branches),
                            thoughtHistoryLength: this.thoughtHistory.length
                        }, null, 2)
                    }]
            };
        }
        catch (error) {
            return {
                content: [{
                        type: "text",
                        text: JSON.stringify({
                            error: error instanceof Error ? error.message : String(error),
                            status: 'failed'
                        }, null, 2)
                    }],
                isError: true
            };
        }
    };
    return SequentialThinkingServer;
}());
// Tool Definitions
var MENTAL_MODEL_TOOL = {
    name: "mentalmodel",
    description: "A tool for applying structured mental models to problem-solving.\nSupports various mental models including:\n- First Principles Thinking\n- Opportunity Cost Analysis\n- Error Propagation Understanding\n- Rubber Duck Debugging\n- Pareto Principle\n- Occam's Razor\n\nEach model provides a systematic approach to breaking down and solving problems.",
    inputSchema: {
        type: "object",
        properties: {
            modelName: {
                type: "string",
                enum: [
                    "first_principles",
                    "opportunity_cost",
                    "error_propagation",
                    "rubber_duck",
                    "pareto_principle",
                    "occams_razor"
                ]
            },
            problem: { type: "string" },
            steps: {
                type: "array",
                items: { type: "string" }
            },
            reasoning: { type: "string" },
            conclusion: { type: "string" }
        },
        required: ["modelName", "problem"]
    }
};
var DEBUGGING_APPROACH_TOOL = {
    name: "debuggingapproach",
    description: "A tool for applying systematic debugging approaches to solve technical issues.\nSupports various debugging methods including:\n- Binary Search\n- Reverse Engineering\n- Divide and Conquer\n- Backtracking\n- Cause Elimination\n- Program Slicing\n\nEach approach provides a structured method for identifying and resolving issues.",
    inputSchema: {
        type: "object",
        properties: {
            approachName: {
                type: "string",
                enum: [
                    "binary_search",
                    "reverse_engineering",
                    "divide_conquer",
                    "backtracking",
                    "cause_elimination",
                    "program_slicing"
                ]
            },
            issue: { type: "string" },
            steps: {
                type: "array",
                items: { type: "string" }
            },
            findings: { type: "string" },
            resolution: { type: "string" }
        },
        required: ["approachName", "issue"]
    }
};
var SEQUENTIAL_THINKING_TOOL = {
    name: "sequentialthinking",
    description: "A detailed tool for dynamic and reflective problem-solving through thoughts.\nThis tool helps analyze problems through a flexible thinking process that can adapt and evolve.\nEach thought can build on, question, or revise previous insights as understanding deepens.\n\nWhen to use this tool:\n- Breaking down complex problems into steps\n- Planning and design with room for revision\n- Analysis that might need course correction\n- Problems where the full scope might not be clear initially\n- Problems that require a multi-step solution\n- Tasks that need to maintain context over multiple steps\n- Situations where irrelevant information needs to be filtered out\n\nKey features:\n- You can adjust total_thoughts up or down as you progress\n- You can question or revise previous thoughts\n- You can add more thoughts even after reaching what seemed like the end\n- You can express uncertainty and explore alternative approaches\n- Not every thought needs to build linearly - you can branch or backtrack\n- Generates a solution hypothesis\n- Verifies the hypothesis based on the Chain of Thought steps\n- Repeats the process until satisfied\n- Provides a correct answer\n\nParameters explained:\n- thought: Your current thinking step, which can include:\n* Regular analytical steps\n* Revisions of previous thoughts\n* Questions about previous decisions\n* Realizations about needing more analysis\n* Changes in approach\n* Hypothesis generation\n* Hypothesis verification\n- next_thought_needed: True if you need more thinking, even if at what seemed like the end\n- thought_number: Current number in sequence (can go beyond initial total if needed)\n- total_thoughts: Current estimate of thoughts needed (can be adjusted up/down)\n- is_revision: A boolean indicating if this thought revises previous thinking\n- revises_thought: If is_revision is true, which thought number is being reconsidered\n- branch_from_thought: If branching, which thought number is the branching point\n- branch_id: Identifier for the current branch (if any)\n- needs_more_thoughts: If reaching end but realizing more thoughts needed\n\nYou should:\n1. Start with an initial estimate of needed thoughts, but be ready to adjust\n2. Feel free to question or revise previous thoughts\n3. Don't hesitate to add more thoughts if needed, even at the \"end\"\n4. Express uncertainty when present\n5. Mark thoughts that revise previous thinking or branch into new paths\n6. Ignore information that is irrelevant to the current step\n7. Generate a solution hypothesis when appropriate\n8. Verify the hypothesis based on the Chain of Thought steps\n9. Repeat the process until satisfied with the solution\n10. Provide a single, ideally correct answer as the final output\n11. Only set next_thought_needed to false when truly done and a satisfactory answer is reached",
    inputSchema: {
        type: "object",
        properties: {
            thought: {
                type: "string",
                description: "Your current thinking step"
            },
            nextThoughtNeeded: {
                type: "boolean",
                description: "Whether another thought step is needed"
            },
            thoughtNumber: {
                type: "integer",
                description: "Current thought number",
                minimum: 1
            },
            totalThoughts: {
                type: "integer",
                description: "Estimated total thoughts needed",
                minimum: 1
            },
            isRevision: {
                type: "boolean",
                description: "Whether this revises previous thinking"
            },
            revisesThought: {
                type: "integer",
                description: "Which thought is being reconsidered",
                minimum: 1
            },
            branchFromThought: {
                type: "integer",
                description: "Branching point thought number",
                minimum: 1
            },
            branchId: {
                type: "string",
                description: "Branch identifier"
            },
            needsMoreThoughts: {
                type: "boolean",
                description: "If more thoughts are needed"
            }
        },
        required: ["thought", "nextThoughtNeeded", "thoughtNumber", "totalThoughts"]
    }
};
// Server Instances
var modelServer = new MentalModelServer();
var debuggingServer = new DebuggingApproachServer();
var thinkingServer = new SequentialThinkingServer();
var server = new index_js_1.Server({
    name: "sequential-thinking-server",
    version: "0.2.0",
}, {
    capabilities: {
        tools: {
            sequentialthinking: SEQUENTIAL_THINKING_TOOL,
            mentalmodel: MENTAL_MODEL_TOOL,
            debuggingapproach: DEBUGGING_APPROACH_TOOL
        },
    },
});
// Request Handlers
server.setRequestHandler(types_js_1.ListToolsRequestSchema, function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, ({
                tools: [
                    SEQUENTIAL_THINKING_TOOL,
                    MENTAL_MODEL_TOOL,
                    DEBUGGING_APPROACH_TOOL
                ],
            })];
    });
}); });
server.setRequestHandler(types_js_1.CallToolRequestSchema, function (request) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (request.params.name) {
            case "sequentialthinking":
                return [2 /*return*/, thinkingServer.processThought(request.params.arguments)];
            case "mentalmodel":
                return [2 /*return*/, modelServer.processModel(request.params.arguments)];
            case "debuggingapproach":
                return [2 /*return*/, debuggingServer.processApproach(request.params.arguments)];
            default:
                throw new types_js_1.McpError(types_js_1.ErrorCode.MethodNotFound, "Unknown tool: ".concat(request.params.name));
        }
        return [2 /*return*/];
    });
}); });
function runServer() {
    return __awaiter(this, void 0, void 0, function () {
        var transport;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    transport = new stdio_js_1.StdioServerTransport();
                    return [4 /*yield*/, server.connect(transport)];
                case 1:
                    _a.sent();
                    console.error("Sequential Thinking MCP Server running on stdio");
                    return [2 /*return*/];
            }
        });
    });
}
runServer().catch(function (error) {
    console.error("Fatal error running server:", error);
    process.exit(1);
});
