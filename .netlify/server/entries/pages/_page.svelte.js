import { c as create_ssr_component } from "../../chunks/index.js";
import "../../chunks/graphQl.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  data.allCategories;
  data.allFacts;
  data.allFacts;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<main><h1 class="${"center"}">Medfacts</h1>
	<div id="${"divLoggedIn"}"><div class="${"center"}"><button id="${"btnDisplayAdd"}" class="${"btn btnPrimary"}">Add New Fact
			</button>
			<br>
			${``}

			${``}

			
			${``}
			
			</div></div>
</main>`;
});
export {
  Page as default
};
