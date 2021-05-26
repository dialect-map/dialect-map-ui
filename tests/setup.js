/* encoding: utf-8 */

import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

/** NOTE:
 *
 * The usage of a community-based Enzyme adapter is due to
 * the lack of official support for React 17.
 * Ref: https://github.com/enzymejs/enzyme/issues/2429
 * Ref: https://github.com/enzymejs/enzyme/pull/2430
 *
 * While the official support is being developed, we will use
 * the alternative version created by GitHub user @wojtekmaj
 */
configure({ adapter: new Adapter() });
