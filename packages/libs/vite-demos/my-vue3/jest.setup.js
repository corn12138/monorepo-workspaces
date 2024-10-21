// jest.setup.js
jest.mock('canvas', () => {
    return {
      createCanvas: () => ({
        getContext: () => ({
          // 模拟必要的方法
        }),
      }),
    };
  });