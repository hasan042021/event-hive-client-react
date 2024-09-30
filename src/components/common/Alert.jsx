import React from "react";
import { Alert, Button } from "@material-tailwind/react";

export default function Message({ open, setOpen, message }) {
  return (
    <div className="w-80">
      <Alert
        color="black"
        action={
          <Button
            variant="text"
            color="black"
            size="sm"
            className="!absolute top-3 right-3 hover:black"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        }
        open={open}
        onClose={() => setOpen(false)}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
      >
        {message}
      </Alert>
    </div>
  );
}
