import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Banner from "@/components/Banner";

describe("Banner Component", () => {
  it(
    "renders banner and switches to static text after animation",
    async () => {
      render(<Banner />);

      // Ensure Banner is in the document initially
      expect(screen.getByTestId("banner")).toBeInTheDocument();

      // Wait for static text ("AWC") to appear after animation
      await waitFor(() => {
        expect(screen.getByText("AWC")).toBeInTheDocument();
      }, { timeout: 8000 }); // ✅ Increased timeout
    },
    12000 // ✅ Extended Jest timeout
  );

  it("triggers shake animation on hover", () => {
    render(<Banner />);
    const bannerContent = screen.getByTestId("banner-content");

    // Simulate hover to trigger shake animation
    fireEvent.mouseEnter(bannerContent);
    expect(bannerContent).toHaveClass("shake");
  });
});
