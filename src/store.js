import { writable, derived } from 'svelte/store';
const { subscribe, update } = writable([
  {
    id: Math.floor(Math.random() * 100000000),
    problem: 'Write a program to find sum a array of integers',
    test_case: '[1, 2, 3, 4, 5]',
    test_output: '[15]',
    solution: 'function solution() { return 0; }',
    changeData: false,
    active: true,
  },
  {
    id: Math.floor(Math.random() * 100000000),
    problem: 'Write  program to find product of given numbers',
    test_case: '[1, 2, 3]',
    test_output: '[6]',
    solution: 'function solution() { return 1; }',
    changeData: false,
    active: false,
  },
]);

function activate(active) {
  return update(tabs =>
    tabs.map(tab => ({ ...tab, active: active === tab.id })),
  );
}

function add() {
  return update(tabs => [
    ...tabs.map(tab => ({ ...tab, active: false })),
    {
      id: Math.floor(Math.random() * 100000000),
      problem: '',
      test_case: '[]',
      test_output: '[]',
      solution: 'function solution() { return 1; }',
      changeData: true,
      active: true,
    },
  ]);
}

function newProblemData(id, newData) {
  return update(tabs =>
    tabs.map(tab => {
      if (tab.id !== id) return tab;
      return newData;
    }),
  );
}

function updateSolution(id, solution) {
  return update(tabs =>
    tabs.map(tab => {
      if (tab.id !== id) {
        return tab;
      }
      return { ...tab, solution };
    })
  );
}

function updateTestInput(id, value){
  return update(tabs=>
      tabs.map(tab=>{
        if(tab.id!==id)
        {
          return tab;
        }
        console.log(value);
        return {...tab, test_case:String(value)}
      }
      )
    )
}

function updateTestOutput(id, value){
  return update(tabs=>
      tabs.map(tab=>{
        if(tab.id!==id)
        {
          return tab;
        }
        return {...tab, test_output:String(value)}
      }
      )
    )
}
function changeDataUpdate(id) {
  return update(tabs =>
    tabs.map(tab => {
      if (tab.id !== id) {
        return tab;
      }
      const change = !tab.changeData;
      return { ...tab, changeData: change };
    }),
  );
}

function deleteTab(id) {
  return update(tabs => {
    return tabs.filter((tab, index) => {
      return tab.id !== id;
    });
  });
}
export const dataStore = {
  subscribe,
  activate,
  add,
  updateSolution,
  changeDataUpdate,
  newProblemData,
  deleteTab,
  updateTestInput,
  updateTestOutput
};

export const currentTab = derived(dataStore, $dataStore =>
  $dataStore.find(({ active }) => active),
);
