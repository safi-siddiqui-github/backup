"use client";

import HeadingOne from "@/components/HeadingOne";
import Heading from "@/components/HeadingOne";
import SectionOne from "@/components/SectionOne";
import SectionTwo from "@/components/SectionTwo";

export default function Page() {
  return (
    <div className="">
      <h2 className="text-xl">Use Context</h2>

      <div className="py-2"></div>
      <h2 className="text-lg">Context</h2>
      <p>
        Context lets a component recieve information from distant parents
        without passing it as props
      </p>
      <p>
        Usually in order to send information btw parent and children we use
        props but it can be verbose difficult to maintain if many childrens are
        there
      </p>
      <p>
        passing props may lead to prop drilling that is difficult to maintain
      </p>
      <p>
        context lets a parent component provide data to entire tree below it
      </p>
      <p>
        THe context itself doesnot hold the information, it represents the kind
        of information you can provide or read from components
      </p>
      <p>
        useContext returns the context value form the closest provider else a
        default value is returned
      </p>
      <p>
        In order to update data, we can use useState to pass data using context provider 
      </p>
      <p>
        In order to override a property use provider for that part of tree
      </p>

      <div className="py-2"></div>

      <p className="text-lg">hook</p>
      <p>
        useContext lets you read and subscribe to context from your component
      </p>
      <p>
        First create context using react in a seperate file with a default value
      </p>
      <p>
        Suppose we have a parent Section component and a Heading child component
      </p>
      <p>
        In order to style heading size we have to give level props on each
        heading component but instead we want to only provide it on parent
        Section component and it should forward the level
      </p>
      <p>
        First we wrap our children in section component with context provider,
        if we dont use a context provider, the default value will be used in
        heading component
      </p>
      <p>
        In the heading we use useContext and set its value to our levelcontext
        to get the value and then use it to style
      </p>
      <p>
        Now we only need to provide props to parent section and it will reach to
        childrens
      </p>
      <p>
        If we dont want to provide level props on section we ca use useContext
        in section
      </p>
      <p>
        Since context lets you read information from a component above, each
        Section could read the level from the Section above, and pass level + 1
        down automatically.
      </p>
      <p>
        In React, the only way to override some context coming from above is to
        wrap children into a context provider with a different value.
      </p>

      <div className="py-2"></div>
      <h2 className="text-lg">Use cases</h2>
      <p>Theming, Current User, Routing, Managing state</p>

      <div className="py-2"></div>

      <h2 className="text-lg">Examples</h2>

      <div className="flex flex-col">
        <p>1.Using Props</p>

        <SectionOne level={1}>
          <HeadingOne>Heading One</HeadingOne>
          <SectionOne level={2}>
            <HeadingOne>Heading Two</HeadingOne>
            <SectionOne level={3}>
              <HeadingOne>Heading Three</HeadingOne>
            </SectionOne>
          </SectionOne>
        </SectionOne>
      </div>

      <div className="flex flex-col">
        <p>2.Without Props</p>

        <SectionTwo>
          <HeadingOne>Heading One</HeadingOne>
          <SectionTwo>
            <HeadingOne>Heading Two</HeadingOne>
            <SectionTwo>
              <HeadingOne>Heading Three</HeadingOne>
              <SectionTwo>
                <HeadingOne>Heading Four</HeadingOne>
                <SectionTwo>
                  <HeadingOne>Heading Five</HeadingOne>
                </SectionTwo>
              </SectionTwo>
            </SectionTwo>
          </SectionTwo>
        </SectionTwo>
      </div>
    </div>
  );
}
