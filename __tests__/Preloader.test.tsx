import { render, screen, waitFor } from "@testing-library/react";
import Preloader from "@/components/Preloader";

describe("Preloader Component", () => {
  it(
    "renders preloader initially and disappears after timeout",
    async () => {
      render(<Preloader onLoaded={() => {}} />);
      
      // Ensure Preloader appears initially
      expect(screen.getByTestId("preloader")).toBeInTheDocument();

      // Wait for Preloader to disappear
      await waitFor(() => {
        expect(screen.queryByTestId("preloader")).not.toBeInTheDocument();
      }, { timeout: 10000 }); // ✅ Increased timeout
    },
    12000 // ✅ Extends Jest timeout for this test
  );
});
