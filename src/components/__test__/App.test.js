import React from "react";
import App from "../App";
import { shallow } from "enzyme";
import "../../setupTest";

// TODO: Add more Snapshot test

describe("<App/>", () => {
  it("renders and matches snapshot", () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});
