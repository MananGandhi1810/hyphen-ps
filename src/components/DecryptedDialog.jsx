import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Check } from "lucide-react";

export function DecryptedDialog({ open, onOpenChange }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-gray-900 border-2 border-red-500">
                <DialogHeader>
                    <div className="mx-auto bg-red-500/20 p-3 rounded-full mb-4">
                        <Check className="h-6 w-6 text-red-500" />
                    </div>
                    <DialogTitle className="text-red-500 text-center">
                        Decryption Successful
                    </DialogTitle>
                    <DialogDescription className="text-red-400 text-center">
                        You have successfully decrypted the problem statements.
                        <div className="mt-4 p-4 border border-red-500/30 bg-red-500/10">
                            Please contact{" "}
                            <span className="font-bold">
                                Arhaan Bhiwandkar - +91 98200 66038
                            </span>{" "}
                            for further details. Make sure to share the
                            screenshot!
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
