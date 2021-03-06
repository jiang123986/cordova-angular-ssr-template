import { trigger, animate, style, transition, query, animateChild, group, AnimationTransitionMetadata, } from "@angular/animations";

/**
 * 获取到整理好的动画
 * @param pageKeys 每个页面的key
 * @param stateChangeExpr 禁用页面切换效果的表达式，如 my => my-borrowing
 */
function getPagesAnimate(pageKeys: Array<string>, stateChangeExpr: Array<string>): Array<AnimationTransitionMetadata> {
  let list = [];
  let enter = [
    style({ position: "relative" }),
    query(":enter, :leave", [
      style({
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
      }),
    ]),
    query(":enter", [style({ left: "100%" })]),
    query(":leave", animateChild()),
    group([
      query(":enter", [animate("300ms ease-out", style({ left: "0%" }))]),
      query(":leave", [animate("300ms ease-out", style({ left: "-100%" }))]),
    ]),
    query(":enter", animateChild()),
  ];

  let leave = [
    style({ position: "relative" }),
    query(":leave,:enter", [
      style({
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
      }),
    ]),
    query(":leave", [style({ left: "0%" })]),
    query(":enter", [style({ left: "-100%" })]),
    group([
      query(":enter", [animate("300ms ease-out", style({ left: "0%" }))]),
      query(":leave", [animate("300ms ease-out", style({ left: "100%" }))]),
    ]),
    query(":enter", animateChild()),
  ];
  for (const item of pageKeys) {
    //enter
    for (const item2 of pageKeys) {
      if (item == item2
        || stateChangeExpr.find(m => m == `${item} => ${item2}`)
        || stateChangeExpr.find(m => m == `${item2} => ${item}`)) {
        continue;
      }
      list.push(transition(`${item} => ${item2}`, enter));
      list.push(transition(`${item2} => ${item}`, leave));
    }
  }
  return list;
}
export const openCloseAnimate = trigger("openClose",
  getPagesAnimate([
    //每个页面所属的的NgModule的路由都有一个animation属性，如ListModule中的路由定义`{ path: '', component: ListComponent, data: { animation: 'list' } }`
    //将其中的list填入下面的数组，该页面的切换效果才会在APP中起作用
    'list',
    'index'
  ],
    [

    ])
);

