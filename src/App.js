import React, { Component } from 'react';
import { firestore, convertCollectionsSnapshotToMap, database } from './firebase/firebase.utils';
import { updatePictures } from "./redux/pictures/pictures.actions";
import { connect } from "react-redux";
import WithSpinner from "./components/with-spinner/with-spinner";

import HomePage from './pages/homePage/homePage';
import './App.css';

const HomePageWithSpinner = WithSpinner(HomePage);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // progressPics: [],
      // finalPics: [],
      loading: true,
    };
  }

  componentDidMount() {
    const { updatePictures } = this.props;
    const collectionRef1 = firestore.collection("pictures");


    this.unsubscribeFromSnapshot = collectionRef1.onSnapshot(
      async (snapshot) => {
        const picturesMap = convertCollectionsSnapshotToMap(snapshot);
        updatePictures(picturesMap);
        this.setState({ loading: false });
      }
    );

    // let progressPicRef = database.ref('progressPics').orderByKey();
    // progressPicRef.on('child_added', snapshot => {
    //   let progressPic = { text: snapshot.val(), id: snapshot.key };
    //   this.setState({ progressPics: [progressPic].concat(this.state.progressPics) });
    // })
  }

  // addMessage(e) {
  //   e.preventDefault();
  //   database.ref('progressPics').push(this.inputEl.value);
  //   this.inputEl.value = '';
  // }

  render() {
    const { loading } = this.state;

    return (
      <div className="App">
        {/* <form onSubmit={this.addMessage.bind(this)}>
          <input type="text" ref={el => this.inputEl = el} />
          <input type="submit" />
          <ul>
            {
              this.state.progressPics.map(progressPic =>
                <li key={progressPic.id}>{progressPic.text}</li>)
            }
          </ul>
        </form> */}
        <header className="App-header">
          <HomePageWithSpinner isLoading={loading}/>
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updatePictures: (picturesMap) => dispatch(updatePictures(picturesMap)),
});

export default connect(null, mapDispatchToProps)(App);

