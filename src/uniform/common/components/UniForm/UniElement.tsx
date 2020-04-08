import React, { Component } from "react";
import { View, Text } from "@tarojs/components";
import { observer } from "mobx-react";

type PageStateProps = {
  path: string;
  containerStore: any;
};

interface UniElement {
  props: PageStateProps;
}

@observer
class UniElement extends Component {
  renderElement(subKey) {
    const { containerStore, path } = this.props;
    const subElementPath = `${path}.${subKey}`;
    return (
      <UniElement
        key={subElementPath}
        path={subElementPath}
        containerStore={containerStore}
      ></UniElement>
    );
  }
  render() {
    const { containerStore, path } = this.props;
    if (!path) {
      return (
        <View>
          <Text>Error: No path!</Text>
        </View>
      );
    }
    const elementStore = containerStore.getElementStore(path);
    if(!elementStore){
      return (
        <View>
          <Text>{`>error: ${path}`}</Text>
        </View>
      )
    }
    const properties = elementStore.properties;
    const items = elementStore.items;
    console.log(`path:${path}`)
    return (
      <View className="UniElement">
        <View>
          <Text>{`> ${path}`}</Text>
        </View>
        {/* sub elements */}
        {properties &&
          Object.keys(properties).map(subKey => this.renderElement(subKey))}
        {items && Object.keys(items.properties).map(subKey => this.renderElement(subKey))}
        <View>
          <Text>{`< ${path}`}</Text>
        </View>
      </View>
    );
  }
}

export default UniElement;
