import { create } from 'zustand'

export type CounterState = {
  count: number;
  increase: () => void;
  decrease: () => void;
}

export const useCounterStore =  create<CounterState>((set) => ({
  count: 0,
  increase: ()=> set((state)=> ({count: state.count+1})),
  decrease: () => set((state) => ({count: state.count-1}))
}))

export const Counter = () => {
  const { count, increase, decrease } = useCounterStore();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increase}>Increase</button>
      <button onClick={decrease}>Decrease</button>
    </div>
  );
};

export default Counter;