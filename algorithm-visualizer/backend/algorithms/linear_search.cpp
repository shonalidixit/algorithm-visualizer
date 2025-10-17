#include "linear_search.hpp"

int linear_search(const std::vector<int>& arr, int val) {
    for (int i = 0; i < arr.size(); ++i)
        if (arr[i] == val)
            return i;
    return -1;
}
