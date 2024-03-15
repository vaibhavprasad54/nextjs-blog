import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

export const ConfirmDialog = ({ openDelete, setOpenDelete, closeModal, id }) => {

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: deleteBlog, isLoading } = useMutation({
    mutationFn: async() => {
      const res = await axios.delete("/api/blog/delete", { data: {id} });
      return res.data;
    },
    onSuccess: () => {
      closeModal();
      toast({
        title: "Blog deleted successfully",
        description: "Keep your thoughts pouring!",
        variant: "default",
      });
      queryClient.invalidateQueries(["blogs"]);
    },
    onError: () => {
      toast({
        title: 'Error while deleting blog!',
        description: "Try again...",
        variant: "destructive",
      });
    }
  })


  return (
    <Dialog open={openDelete} onOpenChange={setOpenDelete} className="bg-opacity-70">
      <DialogContent className="sm:max-w-[425px] max-w-[320px] rounded-md bg-[#0a0a0c]">
        <DialogHeader>
          <DialogDescription>
            <h2 className="text-lg font-semibold text-gray-300">Are you sure you want to delete this blog ?</h2>
          </DialogDescription>
        </DialogHeader>
       
        <DialogFooter>
          <Button onClick={closeModal} type="submit" className="mt-2 sm:mt-0 bg-gray-700 hover:bg-gray-800">Cancel</Button>
          <Button onClick={()=> deleteBlog()} type="submit" className="bg-red-700 hover:bg-red-800">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
