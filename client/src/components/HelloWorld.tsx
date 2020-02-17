import * as React from "react";
import { serviceEndpoint } from "../secrets";

export const HelloWorld: React.FC<{ token: string }> = props => {
  const [result, setResult] = React.useState<null | string>(null);
  const fetchData = React.useCallback(() => {
    fetch(`${serviceEndpoint}/dev/ifttt/v1/triggers/dptest`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${props.token}`
      }
    })
      .then(response => response.text())
      .then(data => setResult(JSON.stringify(data)));
  }, [props.token]);
  return (
    <>
      <button onClick={() => fetchData()}>Fetch</button>
      <div>{result === null ? <div>No result</div> : <div>{result}</div>}</div>
    </>
  );
};
