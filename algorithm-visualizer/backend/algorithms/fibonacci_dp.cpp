#include "fibonacci_dp.hpp"

void fibonacci_dp_steps(int n, nlohmann::json& steps) {
    std::vector<int> fib(n + 1, 0);
    if (n >= 0) {
        fib[0] = 0;
        steps.push_back({{"val", 0}});
    }
    if (n >= 1) {
        fib[1] = 1;
        steps.push_back({{"val", 1}});
    }
    for (int i = 2; i <= n; ++i) {
        fib[i] = fib[i - 1] + fib[i - 2];
        steps.push_back({{"val", fib[i]}});
    }
}

