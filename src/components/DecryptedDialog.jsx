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
            <DialogContent className="bg-gray-900 border-2 border-green-500">
                <DialogHeader>
                    <div className="mx-auto bg-green-500/20 p-3 rounded-full mb-4">
                        <Check className="h-6 w-6 text-green-500" />
                    </div>
                    <DialogTitle className="text-green-500 text-center">
                        Decryption Successful
                    </DialogTitle>
                    <DialogDescription className="text-green-400 text-center">
                        You have successfully decrypted the problem statements.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
