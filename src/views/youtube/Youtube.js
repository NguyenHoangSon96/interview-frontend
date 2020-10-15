import React, {useState, useEffect} from 'react'
import YouTube from 'react-youtube';
import InfiniteScroll from 'react-infinite-scroll-component';
import {CButton, CEmbed, CInput, CInputGroup, CInputGroupAppend} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import axios from "axios";
import {GET_COMMENTS_BY_VIDEO_ID_URL} from "../../actions/endpoints";
import {showNotification} from "../../utils/utils";
import {NOTIFY_TYPE_DANGER} from "../../constant/commonConstant";
import {SET_USER_PROFILE} from "../../actions/actionType";
import {connect, useDispatch, useSelector} from "react-redux";

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

function Youtube(props) {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchVideoId, setSearchVideoId] = useState('');
  const [videoId, setVideoId] = useState('');

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < 20; i++) {
      arr.push('div '+i);
    }
    setItems(arr);
  }, []);

  const fetchMoreData = () => {
    if (items.length >= 80) setHasMore(false);
    const arr = [];

    setTimeout(() => {
      for (let i = 0; i < 20; i++) {
        arr.push('div '+i);
      }
      setItems([...items, ...arr]);
    }, 500);
  }

  const searchVideo = async () => {
    let response;
    try {
      response = await axios.get(GET_COMMENTS_BY_VIDEO_ID_URL, {
        params: {videoId: searchVideoId},
        withCredentials: true
      })
    } catch (err) {
      showNotification(NOTIFY_TYPE_DANGER, 'Notification', err.message);
    }
    setVideoId(searchVideoId);
  }

  return (
    <React.Fragment>
      <div className="d-flex">
        <CInputGroup style={{width: '35%'}}>
          <CInput onChange={(e) => setSearchVideoId(e.target.value)} value={searchVideoId} type="Video Id" id="input2-group2" name="input2-group2" placeholder="Email" />
          <CInputGroupAppend>
            <CButton style={{padding: "0 10px"}} onClick={searchVideo} type="button" color="primary"><CIcon name="cil-magnifying-glass" /> Search</CButton>
          </CInputGroupAppend>
        </CInputGroup>
      </div>

      <div className="row mt-3">
        <div className="col-8">
          <CEmbed ratio="16by9">
            <YouTube
              videoId={videoId}
              onReady= {() => dispatch({type: 'SET_MINIMIZE_SIDEBAR', minimizeSidebar: true})}
              onPlay={() => dispatch({type: 'SET_MINIMIZE_SIDEBAR', minimizeSidebar: true})}

              // id={string}                       // defaults -> null
              // className={string}                // defaults -> null
              // containerClassName={string}       // defaults -> ''
              // opts={obj}                        // defaults -> {}
              // onPause={func}                    // defaults -> noop
              // onEnd={func}                      // defaults -> noop
              // onError={func}                    // defaults -> noop
              // onStateChange={func}              // defaults -> noop
              // onPlaybackRateChange={func}       // defaults -> noop
              // onPlaybackQualityChange={func}    // defaults -> noop
            />
          </CEmbed>
        </div>
        <div className="col-4">
            <InfiniteScroll
              dataLength={items.length}
              next={fetchMoreData}
              hasMore={hasMore}
              height={540}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {items.map((i, index) => (
                <div style={style} key={index}>
                  div - #{index}
                </div>
              ))}
            </InfiniteScroll>
        </div>
      </div>

    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    minimizeSidebar: state.minimizeSidebar,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleSidebar: (val) => dispatch({type: 'SET_MINIMIZE_SIDEBAR', minimizeSidebar: val })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Youtube);
