---
layout: post
title: Redux 시작하기
author: youngmin
category: Study
comment: true
---

출처: [velopert님의 인프런 강좌](https://www.inflearn.com/course/react-%EA%B0%95%EC%A2%8C-velopert/)

### REDUX 시작하기


### 1. 설치
#### 링크 : [Create React App](https://reactjs.org/blog/2016/07/22/create-apps-with-no-configuration.html)

일단 babel과 weppack설정이 번거로우니 create-react-app을 사용하기로 했습니다.

```
$ npm i -g create-react-app
```

설치가 완료되면 
```
$ create-react-app react-example
```
react-example로 예제 폴더를 만듭니다. 폴더명이니 자유롭게 설정하면 되겠습니다.

폴더가 만들어 졌으면 npm start로 서버를 구동시킵니다. localhost:3000으로 서버가 잘 되는지 확인되면 몇가지 모듈을 설치해 줍니다.
```
$ npm install --save redux react-dedux 
``` 
react-dedux는 뷰 레이어 바인딩을 해줍니다.  
이게 없어도 되지만 있으면 컴포넌트에서 redux로 쉽게 연결 할 수 있습니다.

몇가지 툴을 설치하고 Redux 프로젝트의 구조를 설정한 후 기본 컴포넌트들을 준비합니다.

### 2. 사용 tool   
eslint를 설정하였습니다. 마켓에서 다운받거나 npm으로 설치하세요!  
#### .eslintrc
```json
/*.eslintrc*/
{
  "plugins": [
    "react"
  ],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      /* 아래는 spread 문법 parsing 오류시 넣어줍니다. */
      "experimentalObjectRestSpread": true
    },
    "globalReturn": true
  },
  "rules": {    
    "quotes": [
      2,
      "single"
    ],
    "linebreak-style": [
      2,
      "unix"
    ],
    "semi": [
      2,
      "always"
    ],
    "no-unused-vars": [
      "error",
      {
        "vars": "all",
        "args": "none",
        "ignoreRestSiblings": false
      }
    ],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "no-console": [
      "error",
      {
        "allow": [
          "log",
          "error",
          "warn"
        ]
      }
    ]
  },
  "env": {
    "es6": true,
    "node": true,
    "browser": true
  },
  "extends": "eslint:recommended",
  "globals": {
    "$": true,
    "Mustache": true
  }
}
```

효율성을 위해 snippet을 설정하였습니다. (저는 vscode를 사용합니다.)
```js
// javascript snippet
{
    "react class create": {
        "prefix": "rcc",
        "body": [
            "import React, { Component } from 'react';",
            "import PropTypes from 'prop-types';",
            "",
            "const propTypes = {",
            "",
            "};",
            "const defaultProps = {",
            "",
            "};",
            "",
            "class $1 extends Component {",
                "	constructor(props) {",
                    "		super(props);",
                "	}",
                ""
                "	render() {",
                    "		return(",
                        "		<div>$1</div>",
                    "		);",
                "	}",
            "}",
            "",
            "$1.propTypes = propTypes;",
            "$1.defaultProps = defaultProps;",
            ""
            "export default $1;"
            
        ],
        "description": "react class create snippet"
    }
}
```

- react v15이상부터는 PropTypes 가 아닌 prop-types 를 사용합니다.

스니펫 설정이 귀찮으신분은 마켓에서  
react-snippet-extention 설치하시면 됩니다!

### 3. 컴포넌트 생성
<!-- ![구조파악]({{site.url}}/images/build.png) -->

react-example 안의 src폴더에서 index.js를 제외한 쓸데없는 파일들은 지운다음  
action, components, reducers 폴더를 만들어주고  

이제 무엇을 만들건지 생각을 하고 작업을 시작하면 되겠습니다.  
저는 세가지 버튼으로 숫자가 증감하고 배경색을 랜덤하게 바꿀 수 있게 만들겠습니다.

그럼 먼저 src 폴더안 index.js 폴더에서 react를 불러오겠습니다.
```js
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
```

그 다음 components 안에 App.js파일을 만들어줍니다.

```js
// src/components/App.js
// 아까 만든 스니펫으로 만들었습니다.
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// propsTypes를 불러오고 사용하지 않는다는 eslint의 경고는 나중에 작성할 것이니 무시해도 됩니다.

const propTypes = {

};
const defaultProps = {

};
class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
				App
			</div>
		);
	}
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;

```

여기까지 만들었으면 서버를 구동하여 App 글씨가 잘 나오는지 확인해보세요!

다음으로 숫자와 버튼을 관장하는 컴포넌트인 Value.js 와 Control.js를 각각 만들어 줍니다.

먼저 Value.js
```js
// src/components/Value.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    number: PropTypes.number
};
const defaultProps = {
    number: -1 // 기본값은 -1로 설정했습니다.
};

class Value extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <h1>{this.props.number}</h1> 
                {/* props로 연결해줍니다. */}
            </div>
        );
    }
}

Value.propTypes = propTypes;
Value.defaultProps = defaultProps;

export default Value;
// 마찬가지로 내보내줍니다.
```

그다음 control.js
```js
// src/components/control.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// 타입을 함수로 지정하고
const propTypes = {
    onPlus: PropTypes.func,
    onSubtract: PropTypes.func,
    onRandomizeColor: PropTypes.func
};

// 매번 경고창을 띄우기 귀찮으니 함수로 하나 만들어 줍니다.
function createWarning(funcName){
    return () => console.warn(funcName + ' is not defined');
}

// 값이 없으면 경고를 띄우는 기본값을 만들어 줍니다.
const defaultProps = {
    onPlus: createWarning('onPlus'),
    onSubtract: createWarning('onSubtract'),
    onRandomizeColor: createWarning('onRandomizeColor')
};

class Control extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <button onClick={this.props.onPlus}>+</button>
                <button onClick={this.props.onSubtract}>-</button>
                <button onClick={this.props.onRandomizeColor}>Randomize color</button>
                {/* 숫자 증감버튼과 배경을 바꿀 수 있는 버튼을 만들어 줍니다.*/}
            </div>
        );
    }
}

Control.propTypes = propTypes;
Control.defaultProps = defaultProps;

export default Control;
// 마찬가지로 내보내 줍니다.
```

그리고 Counter.js를 만들어 Value 와 control을 불러옵니다.

```js
// src/components/Counter.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// 연결시켜주고
import Value from './Value';
import Control from './Control';

const propTypes = {

};
const defaultProps = {

};

class Counter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <Value/>
                <Control/>
                {/* 이렇게 Counter 컴포넌트로 만들어 줍시다.*/}
            </div>
        );
    }
}

Counter.propTypes = propTypes;
Counter.defaultProps = defaultProps;

export default Counter;
// 이제 만들어진 Counter 컴포넌트를 App.js로 보내줍시다!
```

```js
// src/components/App.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Counter를 불러와서
import Counter from './Counter';

const propTypes = {

};
const defaultProps = {

};
class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
                {/* 이렇게 연결해 주면 완성!*/}
				<Counter/>
			</div>
		);
	}
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
```

기본적인 컴포넌트들을 만들어 봤습니다. 

![완성시 모습]({{site.url}}/images/example.png)

서버를 구동했을때 화면에 이렇게 나온다면 성공!


다음으로는 Action에 대해 알아보겠습니다.


### 4. Action

어떤 작업을 할때 작업에 대한 정보를 가지고 있는 객체를 얘기합니다.

그렇다면 여기서 필요한 액션에는 무엇이 있을까요? 제 생각엔
* 1 값을 증가시키기
* 2 값을 감소시키기
* 3 새로운 색상 입히기

정도가 될 것 같습니다. 이 액션들에게 이름을 붙여줍니다.  
이름은 대문자와 언더스코어를 사용합니다.
* INCREMENT
* DECREMENT
* SET_COLOR

actions/ActionTypes.js를 만들고 이름 지은 액션들을 상수로 설정하고  
다른 곳에서 불러올 수 있게 내보내줍니다.

```js
// src/actions/ActionTypes.js
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const SET_COLOR = 'SET_COLOR';
```

다음 actions/index.js 를 만들고 

```js
// src/actions/index.js
// default가 아닌 상수로 내보냈기에
// import { INCREMENT, DECREMENT, SET_COLOR } from './ActionTypes'; 이렇게 써야하지만
// 이렇게 하면 여러가지 한번에 가지고 올 수 있다.
import * as types from './ActionTypes';

export function increment(){
    return {
        type: types.INCREMENT
    };
}

export function decrement(){
    return {
        type: types.DECREMENT
    };
}

export function setColor(color){
    return {
        type: types.SET_COLOR,
        color  // es6) color: color 와 같음
    };
}
```
이렇게 객체를 반환하는 함수로 내보내 줍시다.

### 5. Reducer

Reducer란 변화를 일으키는 함수이고 순수해야 합니다.

* 비동기작업 x (http작업같은)
* 인수 변경 x
* 동일한 인수 = 동일한 결과

이전 상태와 액션을 받아서 다음 상태를 반환합니다.
```js
// ex)
(previousState, action) => newState
```

여기서 중요!! 이전 상태를 변경하는게 아니라 그저 새로운 상태를 반환하는 것입니다!.

reducer 안에서 인수로 전달받은 기존 상태를 복사하고 액션에 따라 변화를 주고 반환하는 것입니다.

그럼 이제 reducers 디렉토리 안에 숫자의 증감을 위한 counter.js를 만들고
```js
// src/reducers/counter.js
const initialState = {
    number: 0,
    // 필요한건 number 뿐이지만 spread를 공부해보기 위해 다른 키와 값을 넣어보겠습니다.
    dummy: 'dummy',
    dumbObject: {
        d: 0,
        u: 1,
        m: 2,
        b: 3
    }
};

export default function counter(state = initialState(), action){ 
    // counter(state = initialState()로 기본값을 사용할 수 있습니다.
    // es6 문법을 사용하면 간편!
    
    switch (action.type) {
        case types.INCREMENT:
            return {
                ...state,  
                // 이렇게 spread문법으로 객체안의 정보를 가져올 수 있습니다.
                number: state.number + 1,
                dumbObject: { ...state.dumbObject, u: 0} 
                // 객체안의 키와 값을 가져오고 변경 할 수도 있습니다.
            };
        case types.DECREMENT:    
            return {
                ...state,
                number: state.number - 1
            };
        default:
            return state;
    }
}
```
이렇게 ActionTypes에서 상수를 받아와서 counter 함수를 내보내줍니다.

배경변화는 공부 목적이니 여러 reducer를 다뤄보기 위해 하나 더 만들어주겠습니다.

reducers 디렉토리 안에 ui.js를 만들어 주고

```js
// src/reducers/ui.js
import * as types from '../actions/ActionTypes';

const initialState = {
    color: [255, 255, 255]
};

export default function ui(state = initialState(), action){
    if(action.type === types.SET_COLOR){
        return {
            color: action.color
        };
    } else {
        return state;
    }
}
```

받아 오는 action이 types.SET_COLOR 일때 action.color를 반환해주는 ui 함수를 만들어 줍니다.

마지막으로 reducer들을 결합하기위해 reducers 디렉토리에 index.js 를 만들어 주고
```js
// src/reducers/index.js
import { combineReducers } from 'redux';
import counter from './counter';
import ui from './ui';

const reducers = combineReducers({
    counter, ui
});

export default reducers;
```

이렇게 combineReducers안에 결합시킵니다. 그리고 export해주면 reducer는 완성!.

### 6. STORE

Store는 애플리케이션의 현재 상태를 지니고 있습니다. 따라서

```js
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';

import App from './components/App';
import reducers from './reducers'; // index 파일이기에 추가적인 작성 필요 x

// 상수로 store를 만들고 reducers 를 인수로 넣어줍니다.
const store = createStore(reducers);
// 이렇게 하면 store가 만들어 진 것입니다.

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
```

#### 스토어가 하는 일
##### (1) dispatch(action) : action을 reducer로 보낸다는 것!

##### (2) dispatch가 실행되면 store는 reducer 함수에 현재 자신상태와 방금 전달받은 action을  
##### 전달해주고 그럼 reducer는 어떤변화가 필요한지 알아내서 변화를 주고 새 상태를 주면   
##### 현 상태에 갈아 끼우는 것입니다.
##### (3) getState() 현재 상태를 반환하는 함수

##### (4) subscribe(listener)가 상태가 바뀔때 마다 실행할 함수를 등록합니다.
##### 여기서 이 listener가 상태가 바뀔때 마다 실행 될 콜백함수 입니다.

##### (5) replaceReducer(nextReducer) hot-reloading과 코드분할을 구현할때 사용하는데 보통 사용하지 않으므로 여기선 제외 합니다.

```js
// src/index.js
// example
import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';

import App from './components/App';
import reducers from './reducers'; // index 파일이기에 추가적인 작성 필요 x
import * as actions from './actions';

// 상수로 store를 만들고 reducers 를 인수로 넣어줍니다.
const store = createStore(reducers);
// 이렇게 하면 store가 만들어 진 것입니다.

console.log(store.getState()); // 초기 상태가 print 된걸 볼 수 있습니다.
// 이제 상태의 변화가 있을때 마다 특정 함수를 실행하게 해보겠습니다.

store.subscribe( ()=>console.log(store.getState()) );
// 스토어에 변화가 있을때 마다 이 함수를 실행하게 하는 것입니다.

// 이제 액션을 보내봅니다. actioncreator를 import 해줍니다. import * as actions from './actions';
// action을 보내려면 dispatch함수를 이용합니다.
store.dispatch(actions.increment());
store.dispatch(actions.increment());
store.dispatch(actions.decrement());
store.dispatch(actions.setColor([200, 200, 200]));
// 액션 생성자 함수가 실행되면 하나의 액션을 만들어서 반환해 줍니다. 
// 그럼 그 액션 객체를 dispatch함수를 통해 전달합니다.
// number와 color의 변화를 볼 수 있습니다.

// 더이상 print되는것이 싫을경우 위에서 unsubscribe에 subscribe()를 담아줍니다.
// const unsubscribe = store.subscribe( ()=>console.log(store.getState()) );

unsubscribe(); // unsubscribe()를 실행시켜주고 
store.dispatch(actions.setColor([210, 210, 210]));
// 해주면 color가 [200, 200, 200]으로 변하지 않았음을 알 수 있습니다.
ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
```
이해가 되었으면 예제를 지워 줍니다.
```js
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';

import App from './components/App';
import reducers from './reducers';

const store = createStore(reducers); 
// 앞으로 components에서 redux store 안에 있는 데이터를 사용하고 또 필요하면 변화를 주도록 하려면
// App components의 store를 props로 전달해서 하위 컴포넌트 안에서 getstate 한더던지 dispatch 한다던지
// 데이터를 읽어오거나 변화를 주면 됩니다.
// 이렇게 하면 할 수 는 있지만 상당히 구조가 복잡해지게 되므로
// react에서 redux를 더 편하게 쓰는 방법으로 react-redux라는 view-layer binding을 사용하는 것입니다.
ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
```

### 7. React-redux

뷰 레이어 바인딩을 해주는 도구입니다. 

React-redux의 핵심은 2가지 입니다.

#### (1) provider

컴포넌트에서 리덕스를 사용하도록 서비스를 제공합니다.

provider는 하나의 컴포넌트입니다.

```js
// 포로젝트에서 사용하는 컴포넌트를 리액트 돔으로 페이지에 랜더링 하게 될때 해당 컴포넌트를
// provider 컴포넌트로 감싸주면 이 provider가 복잡한 작업들을 알아서 해줍니다.
<Provider store={store}>
    <App>
</Provider>    
```

일단 provider를 react-redux에서 import하고 App을 감싸줍니다.
```js
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';

import App from './components/App';
import reducers from './reducers';

import { Provider } from 'react-redux';

const store = createStore(reducers); 

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
```

이렇게 했다고 아직 App 컴포넌트랑 Counter 컴포넌트에서 store에

접근 할 수 있는 것은 아닙니다. 따로 설정이 필요한데요

여기서 react-redux의 핵심 두번째 connect 입니다.

#### (2) connect([...options])

이 함수는 options를 인수로 받고 컴포넌트를 redux에 연결하는 함수를 반환합니다.

다시한번 강조하지만 '또다른 함수를 반환' 하는 것입니다.

그래서 그 함수에다가

connect()(Counter) 이렇게 카운터를 인수로 전달해주면 

카운터가 redux에 연결이 되서 이 함수의 반환값으로 새로운 컴포넌트 클래스가 반환됩니다.

새로운 컴포넌트 클래스는 redux에 연결이 되어있습니다.

그렇다고 해서 기존에 있던 Counter 컴포넌트가 변경되는건 아니고 

새로운 컴포넌트가 반환되는 겁니다.

만약에 connect()(Counter)에서 처럼 connect에 옵션을 전달하지 않았다면

컴포넌트 내부에서 this.props.store로 접근할 수 있습니다.

그럼 렌더링 할때 그 스토어를 사용해서 getState로 특정값을 가져오면 되겠고

그게 아니고 변화를 일으킨다면 dispatch 하면 되는 것입니다!.

그런데 만약에 여기 옵션을 넣어준다면 더 깔끔해지고 편해집니다.


#### OPTION
option엔 4가지가 있습니다. 첫번째 3개는 함수형태의 parameter입니다.
```js
connect(
    [mapStateToProps],    
    // state를 parameter로 가지는 함수이고 state를 해당 컴포넌트의 props로 연결해주는 것입니다.
    [mapDispatchToProps], 
    // dispatch를 parameter로 가지는 함수이고 dispatch를 해당 컴포넌트의 props로 연결해주는 것입니다.
    [mergeProps],
    // state와 dispatch를 parameter로 가져서 만약에 컴포넌트에 연결해야 할 props가
    // state와 dispatch를 동시에 사용해야 한다면 여기서 사용하면 됩니다.
    // 보통 잘 사용되지는 않습니다.
    [options]
    // 객체형태이며 pure와 withRef가 있습니다.
    // {[pure=true],[withRef=false]}
    // pure는 기본값으로 true가 설정되어있는데 이러면 불필요한 업데이트를 하지 않습니다.
    // withRef는 기본적으로 false 입니다. 만약 이게 true로 설정되어있으면
    // redux에 연결된 컴포넌트를 Ref에 담아서 getWrappedInstace()를 통하여 접근할 수 있게 합니다.
    // 보통 잘 사용되진 않습니다.
)
```
그럼 이제 Counter컴포넌트를 connect를 사용하여 redux에 연결 해보겠습니다.

```js
// src/components/Counter.js

// 먼저 react-redux에서 connect를 가져오고
import { connect } from 'react-redux';
import * as actions from '../actions/';

// export 하기전에 함수를 작성합니다.
// redux state안에 있는걸 이 컴포넌트의 props로 mapping해주는 것입니다.
const mapStateToProps = (state) => { 
    // 여기서 사용된 state는 컴포넌트에서 사용되는 state와는 다른 것입니다. 그냥 파라미터 이름이 state인 것!
    // 그리고 이 state는 redux state를 칭하는 것입니다.

    // 객체를 return하고 어떠한 props가 state의 어떤 값으로 연결될지 여기서 정하는 것
    // number라는 props를 이 파일에 연결할 것이기 때문에
    return {
        number: state.counter.number, // state안 counter안 number값을 연결
        color: state.ui.color // state안 ui안 color값을 연결
    };
    // 이렇게 return하면 state안에 있던 값들이
    // 이 컴포넌트의 number props와 color props로 연결되는 것입니다.
};

const mapDispatchToProps = (dispatch) => {
    // action을 dispatch하는 함수를 props로 연결해주는 것입니다.
    // 우리에게 필요한건 actions의 숫자의 증가, 감소, 색변경 이렇게 3가지이기에 여기서도 각각 연결해줍니다.
    // 그러려면 우선 action creator들을 불러옵니다.
    // import * as actions from '../actions/';
    return {
        // 먼저 increment를 담당할 handleIncrement를 만들어 줍시다.
        handleIncrement: () => { dispatch(actions.increment()); },
        // handleIncrement props를 실행하면 함수가 실행되는 것.
        // 밑에도 마찬가지 setcolor에는 parameter가 있으므로 넣어주면 됩니다.
        handleDecrement: () => { dispatch(actions.decrement()); },
        hadleSetColor: (color) => { dispatch(actions.setColor(color));}
    };
};
export default Counter;
```
더 쉽게 하는 방법으로 
```js
// src/components/Counter.js

import { connect, bindActionCreators } from 'react-redux';
import * as actions from '../actions/';
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch);
    // return {
    //     handleIncrement: () => { dispatch(actions.increment()); },
    //     handleDecrement: () => { dispatch(actions.decrement()); },
    //     hadleSetColor: (color) => { dispatch(actions.setColor(color));}
    // };
};
```
bindActionCreators를 사용해 주는 방법이 있습니다.

이렇게 하면 자동으로 처리해줍니다. actions creator에 parameter가 있다면 그것까지 처리해줍니다.

단점이 있다면 이름을 handleIncrement 이런식으로 지어줬는데 그렇게 임의로 하지 못하고

action creator 이름 그대로 사용해야 하는 것 정도가 있겠습니다..

이런 방법이 있다는 걸 알아두고 프로젝트는 처음 방법으로 하겠습니다.

이제 Counter 컴포넌트를 mapStateToProps, mapDispatchToProps를 사용해서

redux에 연결해 보겠습니다.

```js
export default connect()(Counter);
```
connect가 반환하는 건 컴포넌트를 redux에 연결하는 또다른 함수를 반환합니다.

connect()가 한 함수를 반환하고 그 반환된 함수에 parameter로 (Counter)를 넣어주는 것입니다.

```js
// src/components/Counter.js
class Counter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <Value number={this.props.number}/>
                <Control
                    onPlus={this.props.handleIncrement}
                    onSubtract={this.props.handleDecrement}
                />
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

connect(mapStateToProps, mapDispatchToProps) 의 사용으로 
```js
<Value number={this.props.number}/>
<Control
    onPlus={this.props.handleIncrement}
    onSubtract={this.props.handleDecrement}
/>
```
this.props연결이 가능하게 되었습니다.

드디어 웹화면에서 버튼으로 숫자의 증감이 확인되는걸 볼 수 있습니다.!

이제 마지막으로 배경색변경을 구현해보겠습니다.

완성된 똑똑한 컴포넌트 Counter.js 입니다.
```js
// src/components/Counter.js 

import React, { Component } from 'react';

import Value from './Value';
import Control from './Control';
import { connect } from 'react-redux';
// import { connect, bindActionCreators } from 'react-redux';

import * as actions from '../actions/';

class Counter extends Component {
    constructor(props) {
        super(props);
        // this 바인딩 잊지말고 해줍니다.
        this.setRandomColor = this.setRandomColor.bind(this);
    }

    setRandomColor(){
        const color = [
            // 200~255까지 넣어야 글자와 색이 비슷해져서 안보이는 걸 방지하기 위해
            Math.floor((Math.random() * 55) + 200),
            Math.floor((Math.random() * 55) + 200),
            Math.floor((Math.random() * 55) + 200)
        ];

        this.props.handleSetColor(color);
    }

    render() {

        // smart components는 style 이 없다고 했지만 예외로 div에 넣어주겠습니다.
        const color = this.props.color;
        const style = {
            // background: 'rgb(' + color[0] + ', ' + color[1] + ', ' + color[2] + ')'
            // es5에선 위처럼 불편하게 했어야 하지만 es6에서 Template Literal이라는게 생겼습니다.
            background: `rgb(${color[0]}, ${color[1]}, ${color[2]})`
            // $ 와 {} 브라켓으로 쉽게 사용할 수 있습니다! 오오
        };

        return(
            <div style={style}>
                <Value number={this.props.number}/>
                <Control
                    onPlus={this.props.handleIncrement}
                    onSubtract={this.props.handleDecrement}
                    onRandomizeColor={this.setRandomColor}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        number: state.counter.number,
        color: state.ui.color
    };
};

const mapDispatchToProps = (dispatch) => {
    // return bindActionCreators(actions, dispatch);
    return {
        handleIncrement: () => { dispatch(actions.increment()); },
        handleDecrement: () => { dispatch(actions.decrement()); },
        handleSetColor: (color) => { dispatch(actions.setColor(color));}
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

먼저 setRandomColor(){} 메서드를 만들어 주고 200~255사이의 랜덤값을 가지는 배열을

color 상수에 담아줍니다. 그리고 밑에서 dispatch한 handleSetColor를 연결해

this.props.handleSetColor(color); color를 인자로 넣어줍니다.

constructor에서 this를 바인딩 해주고 

Control안에 onRandomizeColor={this.setRandomColor} 를 넣어줍니다.

그 다음 render(){} 안에 props로 받아온 color와

배경을 담당하는 style 객체를 만들어주고 템플릿 리터럴로 랜덤값을 넣어주고 div에 style 객체를 넣어줍니다.

이제 배경까지 랜덤으로 바뀐다면 모든게 완성 되었습니다!.

마지막으로 사용하지않은 propTypes와 constructor까지 지워주면 깔끔하게 완성됩니다

이런화면이 보이면 되겠습니다! 

![완성본]({{site.url}}/images/complete.png)

이제 backend 부분을 공부하고 마지막 메모 프로젝트까지 달려봅시다!