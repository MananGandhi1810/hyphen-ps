import { Shield, Brain, Code, Zap, Key } from "lucide-react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import problemStatements from "./data/problemStatements.json";
import { decryptProblemStatements } from "./utils/cipher";
import { useState } from "react";
import { DecryptedDialog } from "./components/DecryptedDialog";

const icons = {
    Shield,
    Brain,
    Code,
};

export default function App() {
    const [key, setKey] = useState("");
    const [decryptedData, setDecryptedData] = useState(problemStatements);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [codeRevealed, setCodeRevealed] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleDecrypt = (inputKey) => {
        setKey(inputKey);
        const newDecryptedData = decryptProblemStatements(
            problemStatements,
            inputKey,
        );
        setDecryptedData(newDecryptedData);

        if (
            newDecryptedData.decrypted ===
                "yes the problem statement is decrypted by the user" &&
            !showSuccessDialog
        ) {
            setShowSuccessDialog(true);
        }
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, scale: 0.8 },
        show: { opacity: 1, scale: 1 },
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const handleCodeClick = () => {
        if (codeRevealed) {
            copyToClipboard("GDGCloudMumbai0101241000+");
        } else {
            setCodeRevealed(true);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-black text-red-400 font-mono relative overflow-hidden"
        >
            <DecryptedDialog
                open={showSuccessDialog}
                onOpenChange={setShowSuccessDialog}
            />

            <div className="container mx-auto py-8 px-4 relative z-10">
                <motion.header
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-center"
                >
                    <div className="inline-block border-4 border-red-500 p-4 mb-4 shadow-[0_0_20px_rgba(255,0,0,0.5)]">
                        <h1 className="text-5xl font-bold tracking-tight text-red-500 uppercase">
                            {"<"}
                            <span className="animate-pulse">HYPHEN</span>
                            {" />"}
                        </h1>
                    </div>
                    <h2 className="text-2xl uppercase tracking-widest mt-4 text-purple-400">
                        IDEATHON PROBLEM STATEMENTS
                    </h2>
                    <div className="flex justify-center mt-4">
                        <Zap className="h-6 w-6 text-yellow-400 animate-pulse" />
                        <div className="h-px w-24 bg-yellow-400 self-center mx-2"></div>
                        <Zap className="h-6 w-6 text-yellow-400 animate-pulse" />
                    </div>
                </motion.header>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 p-4 border-2 border-yellow-500 bg-yellow-900/20 text-yellow-300 shadow-[0_0_15px_rgba(255,255,0,0.3)]"
                >
                    <div className="flex items-center justify-center gap-2 font-bold">
                        <Zap className="h-5 w-5 text-yellow-400" />
                        <span>NOTICE:</span>
                        <Zap className="h-5 w-5 text-yellow-400" />
                    </div>
                    <p className="text-center mt-2">
                        This ideathon is now over. To check the problem
                        statements, use code:{" "}
                        <span 
                            className="font-bold bg-yellow-900/50 px-2 py-1 cursor-pointer hover:bg-yellow-900/80 transition-colors relative"
                            onClick={handleCodeClick}
                        >
                            {codeRevealed ? "GDGCloudMumbai0101241000+" : "[ Click to reveal ]"}
                            {copied && (
                                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-900 text-green-300 px-2 py-1 text-xs rounded">
                                    Copied!
                                </span>
                            )}
                            {codeRevealed && !copied && (
                                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-900 text-blue-300 px-2 py-1 text-xs rounded">
                                    Click again to copy
                                </span>
                            )}
                        </span>
                    </p>
                </motion.div>

                <div className="mb-8 flex justify-center items-center gap-4">
                    <div className="relative flex items-center">
                        <Key className="absolute left-3 h-5 w-5 text-red-500" />
                        <input
                            type="text"
                            value={key}
                            onChange={(e) => handleDecrypt(e.target.value)}
                            placeholder="Enter decryption key..."
                            className="pl-10 pr-4 py-2 bg-gray-900 border-2 border-red-500 text-red-400 placeholder-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <Tabs defaultValue="cybersecurity" className="w-full">
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                    >
                        <TabsList className="grid w-full grid-cols-1 h-min mb-8 bg-gray-900 border-cyan-500 p-0 rounded-none md:grid-cols-3">
                            {Object.entries(decryptedData.tracks).map(
                                ([key, track]) => {
                                    const IconComponent = icons[track.icon];
                                    return (
                                        <TabsTrigger
                                            key={key}
                                            value={key}
                                            className={`flex items-center gap-2 data-[state=active]:bg-${
                                                track.color
                                            }-900 data-[state=active]:text-${
                                                track.color
                                            }-400 data-[state=active]:shadow-[0_0_10px_rgba(${
                                                track.color === "yellow"
                                                    ? "255,255,0"
                                                    : track.color === "purple"
                                                    ? "255,0,255"
                                                    : "0,255,255"
                                            },0.5)] rounded-none transition-all border-red-500`}
                                        >
                                            <IconComponent className="h-5 w-5" />
                                            <span className="uppercase tracking-wider">
                                                {track.name}
                                            </span>
                                        </TabsTrigger>
                                    );
                                },
                            )}
                        </TabsList>

                        {Object.entries(decryptedData.tracks).map(
                            ([key, track]) => (
                                <TabsContent
                                    key={key}
                                    value={key}
                                    className="space-y-8"
                                >
                                    <div className="text-center mb-6">
                                        <h3
                                            className={`text-xl text-${track.color}-400 uppercase tracking-widest`}
                                        >
                                            {track.name}
                                        </h3>
                                        <div
                                            className={`h-px w-48 bg-${track.color}-500 mx-auto mt-2`}
                                        ></div>
                                    </div>

                                    <motion.div
                                        variants={container}
                                        initial="hidden"
                                        animate="show"
                                    >
                                        {track.problems.map((problem) => {
                                            return (
                                                <motion.div
                                                    key={problem.id}
                                                    variants={item}
                                                >
                                                    <Card
                                                        className={`border-4 m-2 border-${
                                                            track.color
                                                        }-500 bg-gray-900 rounded-none p-0 shadow-[0_0_15px_rgba(${
                                                            track.color ===
                                                            "yellow"
                                                                ? "255,255,0"
                                                                : track.color ===
                                                                  "purple"
                                                                ? "255,0,255"
                                                                : "0,255,255"
                                                        },0.3)] gap-0`}
                                                    >
                                                        <CardHeader
                                                            className={`border-b-2 border-${track.color}-700 bg-${track.color}-900/30 p-4`}
                                                        >
                                                            <div className="flex items-center">
                                                                <div
                                                                    className={`w-4 h-4 rounded-full bg-${track.color}-500 mr-3 animate-pulse`}
                                                                ></div>
                                                                <CardTitle
                                                                    className={`text-${track.color}-400 uppercase tracking-wider`}
                                                                >
                                                                    {
                                                                        problem.title
                                                                    }
                                                                </CardTitle>
                                                            </div>
                                                        </CardHeader>
                                                        <CardContent
                                                            className={`p-4 text-${track.color}-100`}
                                                        >
                                                            <p className="">
                                                                {
                                                                    problem.description
                                                                }
                                                            </p>
                                                        </CardContent>
                                                    </Card>
                                                </motion.div>
                                            );
                                        })}
                                    </motion.div>
                                </TabsContent>
                            ),
                        )}
                    </motion.div>
                </Tabs>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="text-center mt-12 text-xs text-red-500 font-mono"
                >
                    <p>© 2025 HYPHEN IDEATHON // SYSTEM VERSION 1.0.1</p>
                    <div className="h-px w-48 bg-red-500 mx-auto mt-2 opacity-50"></div>
                </motion.div>
            </div>
        </motion.div>
    );
}
