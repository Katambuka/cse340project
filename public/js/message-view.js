document.getElementById("readButton").addEventListener("click", async (event) => {
   try {
      const button = event.currentTarget;
      const id = button.dataset.id;
      const response = await fetch(`/message/view/$
      {id}/toggle-read`);
      if (!response.ok) {
         throw new Error('Failed to toggle read status');
      }
      const result = await response.json();
      const imgSrc = result ? "read-icon.svg" : "unread-icon.svg";
      button.querySelector("img").src = "/images/site/" + imgSrc;
   } catch (error) {
      console.error('Error toggling read status:', error);
   }
});

document.getElementById("archiveButton").addEventListener("click", async (event) => {
   try {
      const button = event.currentTarget;
      const id = button.dataset.id;
      const response = await fetch(`/message/view/${id}/toggle-archived`);
      if (!response.ok) {
         throw new Error('Failed to toggle archived status');
      }
      const result = await response.json();
      const imgSrc = result ? "archived-icon.svg" : "unarchived-icon.svg";
      button.querySelector("img").src = "/images/site/" + imgSrc;
   } catch (error) {
      console.error('Error toggling archived status:', error);
   }
});
