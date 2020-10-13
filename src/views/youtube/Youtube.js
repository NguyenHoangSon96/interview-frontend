import React, {useState, useEffect} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import {CButton, CEmbed, CInput, CInputGroup, CInputGroupAppend} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

function Youtube(props) {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchVideoId, setSearchVideoId] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

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

  const searchVideo = () => {
    console.log(searchVideoId)
    setVideoUrl(`https://www.youtube.com/embed/${searchVideoId}`);
  }

  return (
    <React.Fragment>
      <div className="d-flex">
        <CInputGroup style={{width: '35%'}}>
          <CInput onChange={(e) => setSearchVideoId(e.target.value)} value={searchVideoId} type="email" id="input2-group2" name="input2-group2" placeholder="Email" />
          <CInputGroupAppend>
            <CButton onClick={searchVideo} type="button" color="primary"><CIcon name="cil-magnifying-glass" /> Search</CButton>
          </CInputGroupAppend>
        </CInputGroup>
      </div>

      <div className="row mt-3">
        <div className="col-8">
          <CEmbed ratio="16by9">
            <iframe src={videoUrl} allowFullScreen/>
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


export default Youtube;
