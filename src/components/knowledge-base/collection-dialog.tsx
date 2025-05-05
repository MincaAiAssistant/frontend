import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FileText } from 'lucide-react';

interface CollectionDialogProps {
  showCollectionDialog: boolean;
  setShowCollectionDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setCollectionName: React.Dispatch<React.SetStateAction<string>>;
  setCollectionNameError: React.Dispatch<React.SetStateAction<string>>;
  collectionName: string;
  collectionNameError: string;
  pendingFiles: File[];
  setPendingFiles: React.Dispatch<React.SetStateAction<File[]>>;
  handleCollectionSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const CollectionDialog = ({
  setShowCollectionDialog,
  showCollectionDialog,
  setCollectionName,
  setCollectionNameError,
  collectionName,
  collectionNameError,
  pendingFiles,
  setPendingFiles,
  handleCollectionSubmit,
}: CollectionDialogProps) => {
  return (
    <>
      <Dialog
        open={showCollectionDialog}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setShowCollectionDialog(false);
            setPendingFiles([]);
            setCollectionName('');
            setCollectionNameError('');
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add to collection</DialogTitle>
            <DialogDescription>
              Enter a collection name to organize your documents. Documents in
              the same collection will be grouped together.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="collection-name" className="text-right">
                Collection name
              </Label>
              <Input
                id="collection-name"
                placeholder="e.g. Policy Documents, Claims Procedures"
                value={collectionName}
                className="text-gray-900"
                onChange={(e) => {
                  setCollectionName(e.target.value);
                  if (e.target.value.trim()) {
                    setCollectionNameError('');
                  }
                }}
              />
              {collectionNameError && (
                <p className="text-xs text-red-500">{collectionNameError}</p>
              )}
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Files to upload:</p>
              <div className="max-h-40 overflow-y-auto space-y-2">
                {pendingFiles.map((file, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <FileText className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="truncate text-gray-900">{file.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowCollectionDialog(false);
                setPendingFiles([]);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCollectionSubmit}
              className="bg-cyan-500 hover:bg-cyan-600"
            >
              Upload Files
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CollectionDialog;
