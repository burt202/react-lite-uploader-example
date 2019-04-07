import React from "react"
import LiteUploader from "lite-uploader"

let lu

class Upload extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      uploads: null,
      error: null,
    }
  }

  componentDidMount() {
    lu = new LiteUploader({
      url: "http://localhost:8000/test/test.php",
      ref: "toUpload",
      rules: {
        allowedFileTypes: "image/jpeg",
      },
      singleFileUploads: true,
    }, this.onEvent)
  }

  onEvent = (name, value) => {
    switch (name) {
    case "lu:errors":
      this.setState({error: "You can only upload .jpg images"})
      break
    case "lu:start":
      this.setState({error: null})
      break
    case "lu:before":
      const uploadsOnStart = {}
      uploadsOnStart[value.files[0].name] = "uploading"
      this.setState({uploads: Object.assign({}, this.state.uploads, uploadsOnStart)})
      break
    case "lu:success":
      const uploadsOnSuccess = {}
      uploadsOnSuccess[value.files[0].name] = "complete"
      this.setState({uploads: Object.assign({}, this.state.uploads, uploadsOnSuccess)})
      break
    default:
      break
    }
  }

  onFileInputChange = (e) => {
    this.startUpload(e.target.files)
  }

  startUpload = (files) => {
    lu.addParam("uploaderName", this.state.uploaderName)
    lu.startUpload(files)
  }

  showProgressRow = (fileName, state) => {
    const icon = (state === "uploading") ? <div className="loader" /> : <div className="checkmark-outer"><div className="checkmark-inner" /></div>

    return (
      <div key={fileName} className="progress-row">
        <div>{fileName}</div>
        {icon}
      </div>
    )
  }

  showCompletion = () => {
    let uploadTotal = 0
    let completedTotal = 0

    Object.keys(this.state.uploads).forEach(function(key) {
      uploadTotal += 1
      if (this.state.uploads[key] === "complete") completedTotal += 1
    }.bind(this))

    if (uploadTotal !== completedTotal) return null

    return (
      <div className="upload-complete">
        <h3>Complete!</h3>
      </div>
    )
  }

  render = () => {
    return (
      <div>
        <h3>React Lite Uploader Example</h3>
        {this.state.error && <p className="error">{this.state.error}</p>}
        {!this.state.uploads && <div>
          <input type="file" key={this.state.error} onChange={this.onFileInputChange} multiple />
        </div>}
        {this.state.uploads && <div>
          {Object.keys(this.state.uploads).map(function(key) {
            return this.showProgressRow(key, this.state.uploads[key])
          }.bind(this))}
          {this.showCompletion()}
        </div>}
      </div>
    )
  }
}

export default Upload
