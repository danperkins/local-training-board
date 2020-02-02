import * as React from "react";
import { serviceEndpoint } from "../secret/secrets";
export const HelloWorld: React.FC = () => {
  const [result, setResult] = React.useState<null | string>(null);
  const fetchData = React.useCallback(() => {
    fetch(`${serviceEndpoint}/dev/hello`)
      .then(response => response.text())
      .then(data => setResult(JSON.stringify(data)));
  }, []);
  return (
    <>
      <button onClick={() => fetchData()}>Fetch</button>
      <div>{result === null ? <div>No result</div> : <div>{result}</div>}</div>
    </>
  );
};
