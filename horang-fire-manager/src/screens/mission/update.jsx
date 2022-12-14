import React, {useState, useEffect, ChangeEvent} from 'react';
import './update.scss';
import {useLocation, useNavigate} from 'react-router-dom';
import api from '../../api/api';
import AWS from 'aws-sdk';
import {S3, S3upload} from 'react-aws-s3';

const S3_BUCKET = 'k7c108';
const REGION = 'ap-northeast-2';

AWS.config.update({
  accessKeyId: 'AKIAWHLOLOLJ3T3C7JUE',
  secretAccessKey: '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',
});

const myBucket = new AWS.S3({
  params: {Bucket: S3_BUCKET},
  region: REGION,
});

function MissionUpdate() {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');
  const [preImg, setPreImg] = useState('');
  const [progress, setProgress] = useState(0);

  const [inputs, setInputs] = useState({
    title: '',
    content: '',
    img: '',
  });

  const {title, content, img} = inputs;
  const onChange = e => {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onChangeImage = e => {
    const imgFile = e.target.files[0];
    const fileUrl = URL.createObjectURL(imgFile);
    setSelectedFile(imgFile);
    setFileName(imgFile.name);
    setFileType(imgFile.type);
    setPreImg(fileUrl);

    const params = {
      ACL: 'public-read',
      Body: selectedFile,
      Bucket: S3_BUCKET,
      Key: fileName,
      ContentType: fileType, // s3서버에서 url 클릭 시 다운로드 안 되고 브라우저로 뜨게 하는 목적
    };
    myBucket
      .putObject(params)
      .on('httpUploadProgress', (evt, Response) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));

        const uploadUrl =
          'https://' +
          Response.request.httpRequest.endpoint.host +
          Response.request.httpRequest.path;

        setInputs({
          ...inputs,
          img: uploadUrl,
        });
      })
      .send(err => {
        if (err) {
          console.log(err);
        }
      });
  };

  const readDetail = async id => {
    try {
      const res = await api.mission.read(id);
      setInputs({
        ...inputs,
        title: res.data.title,
        content: res.data.content,
      });
      setPreImg(res.data.img);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    readDetail(location.state.id);
  }, []);

  useEffect(() => {}, [inputs]);

  const HandleSubmit = async () => {
    // if (selectedFile !== null) {
    //   console.log('sele', selectedFile);
    //   const params = {
    //     ACL: 'public-read',
    //     Body: selectedFile,
    //     Bucket: S3_BUCKET,
    //     Key: fileName,
    //     ContentType: fileType, // s3서버에서 url 클릭 시 다운로드 안 되고 브라우저로 뜨게 하는 목적
    //   };
    //   myBucket
    //     .putObject(params)
    //     .on('httpUploadProgress', (evt, Response) => {
    //       setProgress(Math.round((evt.loaded / evt.total) * 100));

    //       const uploadUrl =
    //         'https://' +
    //         Response.request.httpRequest.endpoint.host +
    //         Response.request.httpRequest.path;

    //       console.log('uploadUrl 1', uploadUrl);
    //       setInputs({
    //         ...inputs,
    //         img: uploadUrl,
    //       });
    //       console.log('uploadUrl 2', uploadUrl);
    //       console.log(inputs);
    //     })
    //     .send(err => {
    //       if (err) {
    //         console.log(err);
    //       }
    //     });
    // }
    // console.log(inputs);

    try {
      await api.mission.update(inputs, location.state.id);
      navigate(`/mission`);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div id="mission_update">
      <div className="create-body">
        <div className="container">
          <div className="input-box">
            <div className="title-box">
              <div className="title-box-text">
                <p className="title">공통미션 수정</p>
              </div>
              <div className="title-box-submit">
                <button
                  type="button"
                  className="login-btn flex align-center justify-center preMid fs-16"
                  onClick={HandleSubmit}>
                  작성 완료
                </button>
              </div>
            </div>
          </div>
          <div className="input-box">
            <p className="input-text">제목</p>
            <input
              name="title"
              className="input-title"
              type="text"
              placeholder="공통미션 제목을 입력해주세요."
              onChange={onChange}
              value={inputs.title}
            />
          </div>
          <div className="input-box">
            <p className="input-text">미션사항</p>
            <textarea
              name="content"
              className="input-content"
              placeholder="공통미션의 규칙, 내용 등을 입력해주세요."
              rows={5}
              cols={5}
              onChange={onChange}
              value={inputs.content}
            />
          </div>
          <div className="input-box">
            <p className="input-text">미션 이미지 예시</p>
            <div className="imageFileBox">
              <input
                type="file"
                name="img"
                accept="image/*"
                onChange={onChangeImage}
              />
              {inputs.img && (
                <div>
                  <img className="image_preview" src={preImg} alt={preImg} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MissionUpdate;
