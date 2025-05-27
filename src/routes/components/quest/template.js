let template_for_one = "";
let template_full = "";

export async function initTemplates() {
  const [t1, t2] = await Promise.all([
    fetch("/templates/template_for_one.tex").then((res) => res.text()),
    fetch("/templates/template_full.tex").then((res) => res.text())
  ]);
  template_for_one = t1;
  template_full = t2;
}

export function template_for_one_func(nomer, sorawlar) {
  return template_for_one?.replace("${nomer}", nomer).replace(
    "${sorawlar_dizimi}",
    sorawlar?.reduce((acc, soraw, i) => {
      return acc + `\\textbf{${i + 1}} ${soraw} \\\\\n`;
    }, "")
  );
}

export function template_full_func(varianlar) {
  return template_full?.replace(
    "${variantlar_dizimi}",
    varianlar?.reduce((acc, variant, i) => {
      return acc + template_for_one_func(i + 1, variant) + `\n\n`;
    }, "")
  );
}
