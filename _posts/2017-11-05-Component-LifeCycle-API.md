---
layout: post
title: Component LifeCycle API (React)
author: youngmin
category: Study
comments: true
---


### 1. Component LifeCycle API란.
Component가 DOM 위에 생성되기 전과 후  
데이터가 변경되어 상태를 업데이트 하기 전과 후  
Component가 DOM에서 사라지기 전에 실행되는 method들을 말함.

### 2. 종류

![lifecycle]({{site.url}}/images/lifecycle.png)   
출처: https://velopert.com/1130  

#### (1)constructor
```js
constructor(props){
    super(props);
    console.log("constructor");
}
```

* 컴포넌트가 처음 만들어질때 실행되고 기본 state를 설정 할수 있다.

#### (2)componentWillMount
```js
componentWillMount(){
    console.log("componentWillMount");
}
```

* 컴포넌트가 DOM위에 만들어지기 전에 실행되는 부분. 따라서 여기선 DOM처리를 할 수 없다.

#### (3)componentDidMount
```js
componentDidMount(){
    console.log("componentDidMount");
}
```

* 컴포넌트가 만들어지고 첫 렌더링을 마친 후 실행된다. 이 안에서 다른 JS framework 연동,  
setTimeout, setInterval 및 ajax, DOM처리 등을 사용 할 수 있다.

#### (4)componentWillReceiveProps
```js
componentWillReceiveProps(){
    console.log("componentWillReceiveProps" + JSON.stringify(nextProps));
}
```

* props를 받을 때 실행됨 props에 따라 state를 업데이트 할 때 사용하면 유용  
이 안에서 setState를 사용해도 괜찮다.

#### (5)shouldComponentUpdate
```js
shouldComponentUpdate(){
    console.log("shouldComponentUpdate" + JSON.stringify(nextProps) + "" + JSON.stringify(nextState));
    return true;
}
```

* props/state 가 변경되었을 때 리렌더링을 할지 말지 정한다.  
위 예제에선 true만 반환하도록 했지만 실제로 사용 할 때는 필요한 비교를 하고 값을 반환하게 하면 된다.  

```js
// ex) 
return nextProps.id !== this.props.id
```
* JSON.stringify 를 사용하여 여러 field를 편하게 비교하자


#### (6)componentWillUpdate
```js
componentWillUpdate(){
    console.log("componentWillUpdate" + JSON.stringify(nextProps) + "" + JSON.stringify(nextState));
}
```

* 컴포넌트가 업데이트 되기 전에 실행된다. 여기서 setState는 절대 사용하지 말것!  
사용하게 되면 무한루프에 빠져들게 된다.

#### (7)componentDidUpdate
```js
componentDidUpdate(){
    console.log("componentDidUpdate" + JSON.stringify(prevProps) + "" + JSON.stringify(prevState));
}
```

* 컴포넌트의 state가 업데이트 될때마다 실행되는 API  
컴포넌트가 리렌더링을 마치면 실행된다. 여기에서도 마찬가지로 setState는 사용하지 말것!

#### (8)componentWillUnmount
```js
componentWillUnmount(){
    console.log("componentWillUnmount");
}
```

* 컴포넌트가 DOM에서 사라진 다음에 실행된다.

### 3.정리    
컴포넌트를 생성 할 때는 constructor -> componentWillMount -> render -> componentDidMount 순으로 진행.

컴포넌트를 제거 할 때는 componentWillUnmount 메소드만 실행.

컴포넌트의 prop이 변경될 때엔 componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate-> render -> componentDidUpdate 순으로 진행된다.

마지막으로 위 예제에는 없지만 state가 변경될 떄엔 props 를 받았을 때 와 비슷하지만 shouldComponentUpdate 부터 시작된다.