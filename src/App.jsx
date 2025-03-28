import { Shield, Brain, Code, Zap } from "lucide-react";
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

const icons = {
    Shield,
    Brain,
    Code,
};

export default function App() {
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

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden"
        >
            <div className="container mx-auto py-8 px-4 relative z-10">
                <motion.header
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-center"
                >
                    <div className="inline-block border-4 border-green-500 p-4 mb-4 shadow-[0_0_20px_rgba(0,255,0,0.5)]">
                        <h1 className="text-5xl font-bold tracking-tight text-green-500 uppercase">
                            <span className="inline-block animate-pulse">
                                H
                            </span>
                            <span>YPHEN</span>
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

                <Tabs defaultValue="cybersecurity" className="w-full">
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                    >
                        <TabsList className="grid w-full grid-cols-1 h-min mb-8 bg-gray-900 border-cyan-500 p-0 rounded-none md:grid-cols-3">
                            {Object.entries(problemStatements.tracks).map(
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
                                            },0.5)] rounded-none transition-all border-green-500`}
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

                        {Object.entries(problemStatements.tracks).map(
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
                                        {track.problems.map((problem) => (
                                            <motion.div
                                                key={problem.id}
                                                variants={item}
                                            >
                                                <Card
                                                    className={`border-4 m-2 border-${
                                                        track.color
                                                    }-500 bg-gray-900 rounded-none p-0 shadow-[0_0_15px_rgba(${
                                                        track.color === "yellow"
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
                                                                {problem.title}
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
                                        ))}
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
                    className="text-center mt-12 text-xs text-green-500 font-mono"
                >
                    <p>© 2025 HYPHEN IDEATHON // SYSTEM VERSION 1.0.1</p>
                    <div className="h-px w-48 bg-green-500 mx-auto mt-2 opacity-50"></div>
                </motion.div>
            </div>
        </motion.div>
    );
}
