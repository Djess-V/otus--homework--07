import _ from "lodash";

interface IContext {
  [key: string]: string | number | IContext | Array<IContext>;
}

interface ILoopVars {
  index: null | number;
  count: number;
  first: 0;
  last: number;
}

export default class Templater {
  template = "";

  regExpTemplate = {
    data: /\{\{(.*?)\}\}/g,
    term: /\{\{if (.+?)\}\}(.+?)\{\{endif\}\}/g,
    loop: /\{\{for (.+?)\}\}(.+?)\{\{endfor\}\}/g,
  };

  loopVars: ILoopVars = {
    index: null,
    count: 0,
    first: 0,
    last: -1,
  };

  compile(tmp: string, ctx: IContext) {
    this.template = tmp;

    this.template = this.parseLoop(this.template, ctx);

    this.template = this.parseTerm(this.template, ctx);

    return this.parseData(this.template, ctx);
  }

  private parseData(tmp: string, ctx: IContext, item: null | string = null) {
    const replacerData = (m: string, subStr: string) => {
      if (!(ctx instanceof Object)) {
        return String(ctx);
      }

      const matches = _.at(ctx, [subStr]);

      if (matches.length === 0) {
        return "";
      }

      return String(matches[0]);
    };

    if (item) {
      const regExpItem = new RegExp(`${item}.`, "g");
      tmp = tmp.replace(regExpItem, "");
    }

    return tmp.replace(this.regExpTemplate.data, replacerData);
  }

  private parseLoop(tmp: string, ctx: IContext) {
    const replacerLoop = (m: string, term: string, subStr: string) => {
      let newStr = "";
      let partsTerm = term.split(" as ");

      partsTerm = partsTerm.map((part) => part.trim());

      if (partsTerm.length > 2) {
        return newStr;
      }

      if (ctx instanceof Array) {
        this.loopVars.count = ctx.length;
        this.loopVars.last = ctx.length - 1;
        for (let i = 0; i < this.loopVars.count; i += 1) {
          this.loopVars.index = i;
          const checkTerm = this.parseTerm(subStr, ctx[i], true);
          newStr += this.parseData(checkTerm, ctx[i]);
        }

        return newStr;
      }

      if (!(partsTerm[0] in ctx)) {
        return newStr;
      }

      if (ctx[partsTerm[0]] instanceof Array) {
        const array = ctx[partsTerm[0]] as IContext[];
        this.loopVars.count = array.length;
        this.loopVars.last = array.length - 1;
        for (let i = 0; i < this.loopVars.count; i += 1) {
          this.loopVars.index = i;
          const checkTerm = this.parseTerm(subStr, array[i], true);
          newStr += this.parseData(checkTerm, array[i], partsTerm[1]);
        }
      }

      return newStr;
    };

    tmp = tmp.replace(this.regExpTemplate.loop, replacerLoop);

    return tmp;
  }

  private parseTerm(tmp: string, ctx: IContext, isLoop = false) {
    const replacerTerm = (m: string, term: string, subStr: string) => {
      const newStr = "";

      if (term.includes("$loop")) {
        if (isLoop) {
          const regExpVarLoop = /\$loop->([a-z]+)/g;
          const result = regExpVarLoop.exec(term);

          if (!result) {
            return newStr;
          }

          switch (result[1]) {
            case "first": {
              if (this.loopVars.index === 0) {
                return this.parseData(subStr, ctx);
              }

              return newStr;
            }
            case "last": {
              if (this.loopVars.index === this.loopVars.last) {
                return this.parseData(subStr, ctx);
              }

              return newStr;
            }
            case "index": {
              term = term.replace("$loop->index", String(this.loopVars.index));
              if (eval(term)) {
                return this.parseData(subStr, ctx);
              }

              return newStr;
            }
            case "notlast": {
              if (this.loopVars.index !== this.loopVars.last) {
                return this.parseData(subStr, ctx);
              }

              return newStr;
            }
            default: {
              return newStr;
            }
          }
        }

        return newStr;
      }

      const matches = _.at(ctx, [term]);

      if (matches.length === 0) {
        return newStr;
      }

      return this.parseData(subStr, ctx);
    };

    return tmp.replace(this.regExpTemplate.term, replacerTerm);
  }
}

export const templater = new Templater();
