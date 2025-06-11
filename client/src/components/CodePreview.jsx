import { Sandpack } from "@codesandbox/sandpack-react"
import { aquaBlue } from "@codesandbox/sandpack-themes";

const CodePreview = ({files, options}) => {
  return (
    <Sandpack
      template="static"
      theme={aquaBlue}
      options={options}
      files={files}
    />
  )
}

export default CodePreview