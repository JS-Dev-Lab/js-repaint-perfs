import { html } from '../lib/lit-html/lit-html.js';
import { repeat } from "../lib/lit-html/directives/repeat.js";

function template({ databases }) {
    return html`
   <table class="table table-striped lastest-data">
      <tbody>
        ${repeat(databases, db => db.dbname, db =>
        html`<tr>
          <td class="dbname">${db.dbname}</td>
          <td class="query-count">
            <span class=${db.lastSample.countClassName}>${db.lastSample.nbQueries}</span>
          </td>
          ${db.lastSample.topFiveQueries.map(q =>
            html`<td class="Query" class=${q.elapsedClassName}>
            ${q.formatElapsed}
                <div class="popover left">
                <div class="popover-content">${q.query}</div>
                <div class="arrow"></div>
                </div>
          </td>`)}
        </tr>`)}
      </tbody >
    </table >`;
}

export { template };
