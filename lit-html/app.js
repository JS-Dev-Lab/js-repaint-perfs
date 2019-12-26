import { UiEngine } from "./infra/engine.js";
import { template } from "./template.js";

const element = document.getElementById("app");
const engine = new UiEngine(element, template);

function run(uiEngine) {
  let view = uiEngine.initialRender({
    databases: []
  });

  function loadSamples() {
    view.update(s => {
      s.databases = ENV.generateData().toArray();
    });
    Monitoring.renderRate.ping();
    setTimeout(loadSamples, ENV.timeout);
  }

  loadSamples();
}

run(engine);