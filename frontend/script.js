const algorithms = [
  {id:"1", name:"Bubble Sort",      inputs:[{label:"Array (comma separated)", id:"array", type:"text"}]},
  {id:"3", name:"Insertion Sort",   inputs:[{label:"Array (comma separated)", id:"array", type:"text"}]},
  {id:"4", name:"Merge Sort",       inputs:[{label:"Array (comma separated)", id:"array", type:"text"}]},
  {id:"5", name:"Quick Sort",       inputs:[{label:"Array (comma separated)", id:"array", type:"text"}]},
  {id:"8", name:"Heap Sort",        inputs:[{label:"Array (comma separated)", id:"array", type:"text"}]},
  {id:"9", name:"Binary Search",    inputs:[{label:"Array (comma separated)", id:"array", type:"text"}, {label:"Target", id:"target", type:"number"}]},
  {id:"10",name:"Linear Search",    inputs:[{label:"Array (comma separated)", id:"array", type:"text"}, {label:"Target", id:"target", type:"number"}]},
  {id:"11",name:"BFS",              inputs:[{label:"Nodes (n)",id:"nodes", type:"number"},
                                            {label:"Edges (u-v comma separated)", id:"edges", type:"text"},
                                            {label:"Start node", id:"start", type:"number"}]},
  {id:"12",name:"DFS",              inputs:[{label:"Nodes (n)",id:"nodes", type:"number"},
                                            {label:"Edges (u-v comma separated)", id:"edges", type:"text"},
                                            {label:"Start node", id:"start", type:"number"}]},
  {id:"13",name:"Dijkstra",         inputs:[{label:"Nodes (n)",id:"nodes", type:"number"},
                                            {label:"Edges (u-v-w comma separated)", id:"edges", type:"text"},
                                            {label:"Source node", id:"start", type:"number"}]},
  {id:"14",name:"Fibonacci",        inputs:[{label:"n",id:"n",type:"number"}]}
];

document.addEventListener("DOMContentLoaded", () => {
  const algoSelect = document.getElementById("algorithm-select");
  algorithms.forEach(a => {
    let opt = document.createElement("option");
    opt.value = a.id; opt.textContent = a.name;
    algoSelect.appendChild(opt);
  });
  algoSelect.onchange = renderInputs;
  document.getElementById("run-algo").onclick = runAlgorithm;
  renderInputs();
});

function renderInputs() {
  const area = document.getElementById("algo-input-area");
  area.innerHTML = "";
  const algoId = document.getElementById("algorithm-select").value;
  const algo = algorithms.find(a => a.id === algoId);
  if (!algo) return;
  for (const inp of algo.inputs) {
    let field = document.createElement("div");
    field.innerHTML = `<label>${inp.label}: </label><input id="input-${inp.id}" type="${inp.type}" style="margin-left:6px"/>`;
    area.appendChild(field);
  }
}

function runAlgorithm() {
  const algoId = document.getElementById("algorithm-select").value;
  const algo = algorithms.find(a => a.id === algoId);
  if (!algo) return alert("Pick an algorithm first!");
  let inVals = {};
  for (const inp of algo.inputs) {
    let val = document.getElementById("input-"+inp.id).value;
    if (inp.type === "number") val = parseInt(val);
    inVals[inp.id] = val;
  }
  document.getElementById("input-display").textContent = JSON.stringify(inVals, null, 2);

  let steps = [], output = "";
  let arr = [];
  if (algoId === "1") {
    arr = inVals.array.split(',').map(Number).filter(x=>!isNaN(x));
    steps = bubbleSortSteps(arr);
    output = JSON.stringify([...arr].sort((a,b)=>a-b))
  } else if (algoId === "3") {
    arr = inVals.array.split(',').map(Number).filter(x=>!isNaN(x));
    steps = insertionSortSteps(arr);
    output = JSON.stringify([...arr].sort((a,b)=>a-b))
  } else if (algoId === "4") {
    arr = inVals.array.split(',').map(Number).filter(x=>!isNaN(x));
    steps = mergeSortSteps(arr);
    output = JSON.stringify([...arr].sort((a,b)=>a-b))
  } else if (algoId === "5") {
    arr = inVals.array.split(',').map(Number).filter(x=>!isNaN(x));
    steps = quickSortSteps(arr);
    output = JSON.stringify([...arr].sort((a,b)=>a-b))
  } else if (algoId === "8") {
    arr = inVals.array.split(',').map(Number).filter(x=>!isNaN(x));
    steps = heapSortSteps(arr);
    output = JSON.stringify([...arr].sort((a,b)=>a-b))
  } else if (algoId === "9") {
    arr = inVals.array.split(',').map(Number).filter(x=>!isNaN(x));
    steps = binarySearchSteps(arr, inVals.target);
    output = steps[steps.length-1]?.found ? `Found at index ${steps[steps.length-1].index}` : "Not Found";
  } else if (algoId === "10") {
    arr = inVals.array.split(',').map(Number).filter(x=>!isNaN(x));
    steps = linearSearchSteps(arr, inVals.target);
    output = steps[steps.length-1]?.found ? `Found at index ${steps[steps.length-1].index}` : "Not Found";
  } else if (algoId === "11") {
    steps = bfsSteps(inVals.nodes, inVals.edges, inVals.start);
    output = `BFS Order: ` + steps.filter(s => s.node!==undefined).map(s=>s.node).join(", ");
  } else if (algoId === "12") {
    steps = dfsSteps(inVals.nodes, inVals.edges, inVals.start);
    output = `DFS Order: ` + steps.filter(s => s.node!==undefined).map(s=>s.node).join(", ");
  } else if (algoId === "13") {
    steps = dijkstraSteps(inVals.nodes, inVals.edges, inVals.start);
    output = `Dijkstra: See steps`;
  } else if (algoId === "14") {
    const n = inVals.n;
    steps = fibonacciSteps(n);
    output = `Fib(${n}) = ${steps[steps.length-1]?.val}`;
  }
  document.getElementById("output-display").textContent = output;
  animateSteps(steps);
}

function showDescription(desc) {
  let descArea = document.getElementById('step-description');
  if (!descArea) {
    descArea = document.createElement('div');
    descArea.id = 'step-description';
    descArea.style = 'width:99%;font-size:1.14rem;color:#835aa3;margin:10px 0 6px 0;';
    document.getElementById("array-container").parentNode.insertBefore(descArea, document.getElementById("array-container"));
  }
  descArea.textContent = desc || "";
}

function animateSteps(steps) {
  const container = document.getElementById('array-container');
  let i = 0;
  function showStep() {
    if (!steps || i >= steps.length) return;
    container.innerHTML = "";
    showDescription(steps[i].description);
    const step = steps[i];
    if (step.array) {
      step.array.forEach((v, j) => {
        const bar = document.createElement('div');
        bar.className = 'array-bar';
        bar.style.height = `${v*6+24}px`;
        bar.style.width = "38px";
        bar.textContent = v;
        if(step.highlight && step.highlight.includes(j)) bar.style.background = "#ffd1dc";
        container.appendChild(bar);
      });
    }
    if (step.node !== undefined) {
      const nodeDiv = document.createElement('div');
      nodeDiv.className = 'array-bar';
      nodeDiv.style.height = '56px';
      nodeDiv.style.width = '56px';
      nodeDiv.style.background = '#c1f2fd';
      nodeDiv.style.fontSize = '2.6rem';
      nodeDiv.textContent = step.node;
      container.appendChild(nodeDiv);
    }
    if (step.val !== undefined) {
      const valDiv = document.createElement('div');
      valDiv.className = 'array-bar';
      valDiv.style.height = '56px';
      valDiv.style.width = '56px';
      valDiv.style.background = '#ffe0ac';
      valDiv.style.fontSize = '2.2rem';
      valDiv.textContent = step.val;
      container.appendChild(valDiv);
    }
    i++; setTimeout(showStep, 850);
  }
  showStep();
}

// ----------- Algorithm logic (with descriptions) -------------------

function bubbleSortSteps(arr) {
  let a = [...arr], steps = [{array:[...a], description:"Initial array"}];
  for(let i=0;i<a.length;i++)for(let j=0;j<a.length-1-i;j++){
    steps.push({array:[...a],highlight:[j,j+1], description:`Compare ${a[j]} & ${a[j+1]}`});
    if(a[j]>a[j+1]){
      [a[j],a[j+1]]=[a[j+1],a[j]];
      steps.push({array:[...a],highlight:[j,j+1], description:`Swapped ${a[j]} & ${a[j+1]}`});
    }
  }
  steps.push({array:[...a], description:"Sorted output"});
  return steps;
}

function insertionSortSteps(arr) {
  let a = [...arr], steps = [{array:[...a], description:"Initial array"}];
  for(let i=1;i<a.length;i++){
    let key=a[i],j=i-1;
    steps.push({array:[...a],highlight:[i],description:`Key = ${key}`});
    while(j>=0 && a[j]>key){
      steps.push({array:[...a],highlight:[j+1,j],description:`${a[j]} > ${key}: Shift`});
      a[j+1]=a[j];j--;
      steps.push({array:[...a],highlight:[j+1],description:`Insert key at ${j+1}`});
    }
    a[j+1]=key;
    steps.push({array:[...a],highlight:[j+1], description:`Put key at position ${j+1}`});
  }
  steps.push({array:[...a], description:"Sorted output"});
  return steps;
}

function mergeSortSteps(arr) {
  let a = [...arr], steps = [{array:[...a],description:"Initial array"}];
  function mergeSort(l,r){
    if(l>=r)return;
    let m=Math.floor((l+r)/2);
    mergeSort(l,m);
    mergeSort(m+1,r);
    let left=a.slice(l,m+1),right=a.slice(m+1,r+1),k=l,i=0,j=0;
    while(i<left.length && j<right.length){
      steps.push({array:[...a],highlight:[k],description:`Compare ${left[i]} & ${right[j]}`});
      a[k++] = (left[i]<right[j]) ? left[i++] : right[j++];
    }
    while(i<left.length){
      steps.push({array:[...a],highlight:[k],description:`Add ${left[i]}`});
      a[k++]=left[i++];
    }
    while(j<right.length){
      steps.push({array:[...a],highlight:[k],description:`Add ${right[j]}`});
      a[k++]=right[j++];
    }
  }
  mergeSort(0,a.length-1);
  steps.push({array:[...a],description:"Sorted output"});
  return steps;
}

function quickSortSteps(arr) {
  let a = [...arr], steps = [{array:[...a],description:"Initial array"}];
  function quick(l,r){
    if(l>=r)return;
    let pivot=a[r],i=l;
    steps.push({array:[...a],highlight:[r],description:`Pivot ${pivot}`});
    for(let j=l;j<r;j++){
      steps.push({array:[...a],highlight:[j,r],description:`Compare ${a[j]} & ${pivot}`});
      if(a[j]<pivot){
        [a[i],a[j]]=[a[j],a[i]];
        steps.push({array:[...a],highlight:[i,j],description:`Swapped ${a[i]} & ${a[j]}`});
        i++;
      }
    }
    [a[i],a[r]]=[a[r],a[i]];
    steps.push({array:[...a],highlight:[i,r],description:`Move pivot to position ${i}`});
    quick(l,i-1);quick(i+1,r);
  }
  quick(0,a.length-1);
  steps.push({array:[...a],description:"Sorted output"});
  return steps;
}

function heapSortSteps(arr){
  let a=[...arr],steps=[{array:[...a],description:"Initial array"}];
  function heapify(n,i){
    let largest=i,l=2*i+1,r=2*i+2;
    if(l<n && a[l]>a[largest])largest=l;
    if(r<n && a[r]>a[largest])largest=r;
    if(largest!=i){
      steps.push({array:[...a],highlight:[i,largest],description:`Swap ${a[i]} & ${a[largest]}`});
      [a[i],a[largest]]=[a[largest],a[i]];
      heapify(n,largest);
    }
  }
  for(let i=Math.floor(a.length/2)-1;i>=0;i--)heapify(a.length,i);
  for(let i=a.length-1;i>0;i--){
    steps.push({array:[...a],highlight:[0,i],description:`Extract max: Swap ${a[0]} & ${a[i]}`});
    [a[0],a[i]]=[a[i],a[0]];
    heapify(i,0);
  }
  steps.push({array:[...a],description:"Sorted output"});
  return steps;
}

function linearSearchSteps(arr,target){
  let steps=[{array:arr,highlight:[],description:"Start linear search"}],found=false,idx=-1;
  for(let i=0;i<arr.length;i++){
    steps.push({array:arr,highlight:[i],description:`Check ${arr[i]} at index ${i}`});
    if(arr[i]===target){
      found=true;idx=i;
      steps.push({array:arr,highlight:[i],found,index:i,description:`Found target ${target} at index ${i}`});
      break;
    }
  }
  if(!found)
    steps.push({array:arr,highlight:[-1],found,index:-1,description:`Target ${target} not found`});
  return steps;
}

function binarySearchSteps(arr,target){
  arr = arr.slice().sort((a,b)=>a-b);
  let steps=[{array:arr,highlight:[],description:"Start binary search"}],left=0,right=arr.length-1,found=false,idx=-1;
  while(left<=right){
    let mid=Math.floor((left+right)/2);
    steps.push({array:arr,highlight:[mid],description:`Check middle element ${arr[mid]} at index ${mid}`});
    if(arr[mid]===target){
      found=true;idx=mid;
      steps.push({array:arr,highlight:[mid],found,index:mid,description:`Found target at index ${mid}`});
      break;
    }
    else if(arr[mid]<target){
      steps.push({array:arr,highlight:[mid],description:`${target} > ${arr[mid]}, search right half`});
      left=mid+1;
    }else{
      steps.push({array:arr,highlight:[mid],description:`${target} < ${arr[mid]}, search left half`});
      right=mid-1;
    }
  }
  if(!found)
    steps.push({array:arr,highlight:[-1],found,index:-1,description:`Target ${target} not found`});
  return steps;
}

function bfsSteps(n,edgesStr,start){
  let adj=Array.from({length:n},()=>[]);
  const edges=edgesStr.split(',').map(e=>e.split('-').map(Number));
  edges.forEach(([u,v])=>adj[u].push(v));
  let visited=Array(n).fill(false),queue=[start],steps=[{node:start,description:`Start from node ${start}`}];
  visited[start]=true;
  while(queue.length){
    let u=queue.shift();
    steps.push({node:u,description:`Visiting node ${u}`});
    adj[u].forEach(v=>{
      if(!visited[v]){
        queue.push(v);visited[v]=true;
        steps.push({node:v,description:`Queue node ${v}`});
      }
    });
  }
  return steps;
}

function dfsSteps(n,edgesStr,start){
  let adj=Array.from({length:n},()=>[]);
  const edges=edgesStr.split(',').map(e=>e.split('-').map(Number));
  edges.forEach(([u,v])=>adj[u].push(v));
  let visited=Array(n).fill(false),steps=[];
  function dfs(u){
    visited[u]=true;steps.push({node:u,description:`Visit node ${u}`});
    adj[u].forEach(v=>{if(!visited[v]){steps.push({node:v,description:`Go deeper to node ${v}`});dfs(v);} });
  }
  dfs(start);return steps;
}

function dijkstraSteps(n,edgesStr,start){
  let adj=Array.from({length:n},()=>[]);
  const edges=edgesStr.split(',').map(e=>e.split('-').map(Number));
  edges.forEach(([u,v,w])=>adj[u].push({v,w}));
  let dist=Array(n).fill(Infinity);dist[start]=0;
  let vis=Array(n).fill(false),steps=[{node:start,description:`Start from node ${start}`}];
  for(let count=0;count<n;count++){
    let u=-1,min=Infinity;
    for(let i=0;i<n;i++)if(!vis[i]&&dist[i]<min){min=dist[i];u=i;}
    if(u==-1)break; vis[u]=true; steps.push({node:u,description:`Visit node ${u}, dist=${dist[u]}`});
    adj[u].forEach(({v,w})=>{
      if(dist[u]+w<dist[v]){
        dist[v]=dist[u]+w;
        steps.push({node:v,description:`Update dist for node ${v}: ${dist[v]}`});
      }
    })
  }
  return steps;
}

function fibonacciSteps(n){
  let fib=[0,1],steps=[{val:0,description:"Fib(0)=0"},{val:1,description:"Fib(1)=1"}];
  for(let i=2;i<=n;i++){
    fib[i]=fib[i-1]+fib[i-2];
    steps.push({val:fib[i],description:`Fib(${i})=${fib[i-1]}+${fib[i-2]}=${fib[i]}`});
  }
  return steps;
}
