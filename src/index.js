import React from "react"
import ReactDOM from "react-dom"
import Upload from "./upload"

import "./app.css"

ReactDOM.render(
  <Upload />,
  document.body.querySelector(".container")
)

if (module.hot) {
  module.hot.accept("./upload", function() {
    const AppContainer = require("react-hot-loader").AppContainer
    const Upload = require("./upload")

    ReactDOM.render(
      <AppContainer>
        <Upload />
      </AppContainer>,
      document.body.querySelector(".container")
    )
  })
}
