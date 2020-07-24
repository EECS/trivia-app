import React from "react";
import { shallow } from "enzyme";
import Layout from "./Layout"

describe("Test Layout component", () => {
    it("Will render the component", () => {
        const wrapper = shallow(<Layout />)

        expect(wrapper).toBeDefined()
    })
})