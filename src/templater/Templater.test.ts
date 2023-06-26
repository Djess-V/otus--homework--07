import Templater from "./Templater";

describe("Templater", () => {
  const templater = new Templater();

  const context = {
    name: "Bob",
    age: 35,
    children: [
      {
        name: "Alice",
        age: 5,
      },
      {
        name: "Tom",
        age: 15,
      },
    ],
    education: {
      status: "higher",
      graduation_year: 2010,
      institution: "MTI",
    },
    address: {
      country: "Russia",
      city: "Krasnoyarsk",
      street: "Vavilova",
      house: 250,
    },
  };

  it("is a function", () => {
    expect(Templater).toBeInstanceOf(Function);
  });

  it("checking the templating tool with the data", () => {
    const tmp = "My name is {{name}}! I'm {{age}} years old.";

    expect(templater.compile(tmp, context)).toBe(
      "My name is Bob! I'm 35 years old."
    );
  });

  it("checking the work of the templating tool with conditions", () => {
    const tmp =
      "My name is {{name}}! I'm {{age}} years old.{{if address}} My address: {{address.country}}, {{address.city}}, {{address.street}} street, {{address.house}}.{{endif}}";

    expect(templater.compile(tmp, context)).toBe(
      "My name is Bob! I'm 35 years old. My address: Russia, Krasnoyarsk, Vavilova street, 250."
    );
  });

  it("checking the work of the templating tool with loops", () => {
    const tmp =
      "My name is {{name}}! I'm {{age}} years old. Children: {{for children as item}}{{item.name}} {{item.age}} years old{{if $loop->notlast}}, {{endif}}{{if $loop->last}}!{{endif}}{{endfor}}";

    expect(templater.compile(tmp, context)).toBe(
      "My name is Bob! I'm 35 years old. Children: Alice 5 years old, Tom 15 years old!"
    );
  });

  it("сheck the templator on the template from homework", () => {
    const tmp1 = `<h2>{{name}}</h2>{{if age}}<h3>{{age}}</h3>{{endif}}<div class="childrens">{{for children as item}}<a class="children_name" href="#children{{item.name}}"> {{item.name}} - {{item.age}}</a>{{if $loop->notlast}}, {{endif}}{{endfor}}</div>`;

    expect(templater.compile(tmp1, context)).toBe(
      `<h2>Bob</h2><h3>35</h3><div class="childrens"><a class="children_name" href="#childrenAlice"> Alice - 5</a>, <a class="children_name" href="#childrenTom"> Tom - 15</a></div>`
    );

    const tmp2 = `<h2>{{name}}</h2>{{if age}}<h3>{{age}}</h3>{{endif}}<div class="childrens">{{for children as item}}<a class="children_name" href="#children{{item.name}}"> {{item.name}} - {{item.age}}</a>{{if $loop->first}}, {{endif}}{{endfor}}</div>`;

    expect(templater.compile(tmp2, context)).toBe(
      `<h2>Bob</h2><h3>35</h3><div class="childrens"><a class="children_name" href="#childrenAlice"> Alice - 5</a>, <a class="children_name" href="#childrenTom"> Tom - 15</a></div>`
    );

    const tmp3 = `<h2>{{name}}</h2>{{if age}}<h3>{{age}}</h3>{{endif}}<div class="childrens">{{for children as item}}<a class="children_name" href="#children{{item.name}}"> {{item.name}} - {{item.age}}</a>{{if $loop->index === 0}}, {{endif}}{{endfor}}</div>`;

    expect(templater.compile(tmp3, context)).toBe(
      `<h2>Bob</h2><h3>35</h3><div class="childrens"><a class="children_name" href="#childrenAlice"> Alice - 5</a>, <a class="children_name" href="#childrenTom"> Tom - 15</a></div>`
    );
  });
});
