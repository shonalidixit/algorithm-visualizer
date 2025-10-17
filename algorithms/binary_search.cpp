#include "binary_search.hpp"

int binary_search(const std::vector<int>& arr, int val) {
    int l = 0, r = arr.size() - 1;
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == val)
            return m;
        else if (val < arr[m])
            r = m - 1;
        else
            l = m + 1;
    }
    return -1;
}
