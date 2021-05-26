/* encoding: utf-8 */

import { render } from "@testing-library/react";
import PapersHeader from "../../../src/scenes/papers/components/Header";

describe("Header component", () => {
    /** Set of tests for the Header component */

    test("Shows header title", () => {
        const { getByText } = render(<PapersHeader />);
        const headerTitle = getByText("Dialect Map");
        expect(headerTitle).toBeDefined();
    });
});
