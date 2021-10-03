import axios from "axios";
import React, { Component } from "react";
import PubSub from "pubsub-js";

class Search extends Component {
  search = () => {
    const {
      keyWordElement: { value: keyWord },
    } = this;
    PubSub.publish("atguigu", { isFirst: false, isLoading: true });

    this.props.updataAppState({ isFirst: false, isLoading: true });
    axios.get(`/api1/search/users?q=${keyWord}`).then(
      (response) => {
        // this.props.updataAppState({
        //   isLoading: false,
        //   users: response.data.items,
        // });
        PubSub.publish("atguigu", {
          isLoading: false,
          users: response.data.items,
        });
      },
      (error) => {
        // this.props.updataAppState({ isLoading: false, err: error.message });
        PubSub.publish("atguigu", { isLoading: false, err: error.message });
      }
    );
    //fetch methods
    //   try {
    //     const response = await fetch(`/api1/search/users2?q=${keyWord}`);
    //     const data = await response.json();
    //     console.log(data);
    //     PubSub.publish("atguigu", { isLoading: false, users: data.items });
    //   } catch (error) {
    //     console.log("请求出错", error);
    //     PubSub.publish("atguigu", { isLoading: false, err: error.message });
    //   }
  };
  render() {
    return (
      <div>
        <div>
          <section className="jumbotron">
            <h3 className="jumbotron-heading">Search Github Users</h3>
            <div>
              <input
                ref={(c) => (this.keyWordElement = c)}
                type="text"
                placeholder="enter the name you search"
              />
              &nbsp;<button onClick={this.search}>Search</button>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Search;
