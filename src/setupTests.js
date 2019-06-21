// This setup file is run automatically
// See: https://facebook.github.io/create-react-app/docs/running-tests#initializing-test-environment

import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
