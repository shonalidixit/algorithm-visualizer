#include <vector>
#include "json.hpp"
void dfs(int u, const std::vector<std::vector<int>>& adj, std::vector<bool>& vis, nlohmann::json& steps);
