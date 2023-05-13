import { Collapse } from "antd";
const { Panel } = Collapse;
const text = `
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere aperiam saepe ex sunt dignissimos, natus corporis mollitia tempore, voluptate iusto eveniet blanditiis unde suscipit, dolores possimus facilis ab necessitatibus repellat.
`;
const CollapseAntCom = () => {
  const onChange = (key) => {
    // console.log(key);
  };
  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange} size="large">
      <Panel header="Introduce" key="1">
        <div className="flex justify-between items-center">
          <span>1.{text}</span>
          <span>03:58</span>
        </div>
        <div className="flex justify-between items-center">
          <span>2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus ad quidem tempore iusto nesciunt voluptatum doloremque adipisci velit? Maiores magnam sapiente reiciendis vero quas beatae, illo alias qui iste corporis! </span>
          <span>03:58</span>
        </div>
      </Panel>
      <Panel header="How to install PHP" key="2">
        <p>{text}</p>
      </Panel>
      <Panel header="Learning PHP core" key="3">
        <p>{text}</p>
      </Panel>
    </Collapse>
  );
};
export default CollapseAntCom;
