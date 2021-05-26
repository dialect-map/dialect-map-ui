/* encoding: utf-8 */

import { render, fireEvent } from "@testing-library/react";
import HeaderModal from "../../../../src/scenes/papers/components/header/HeaderModal";

describe("HeaderModal component", () => {
    /** Set of tests for the HeaderModal component */

    test("Shows modal button", () => {
        const { getByText } = render(<HeaderModal />);
        const modalButton = getByText("Info");
        expect(modalButton).toBeDefined();
    });

    test("Shows modal content upon click", async () => {
        const { getByText } = render(<HeaderModal />);
        const button = getByText("Info");
        fireEvent.click(button);

        const modelContentTitle = getByText("Project description");
        expect(modelContentTitle).toBeDefined();
    });

    test("Hides modal content prior click", async () => {
        const { queryByText } = render(<HeaderModal />);
        const modelContentTitle = queryByText("Project description");
        expect(modelContentTitle).toBeNull();
    });
});
