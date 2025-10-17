#include "dfs.hpp"
void dfs(int u, const std::vector<std::vector<int>>& adj, std::vector<bool>& vis, nlohmann::json& steps) {
    vis[u] = true;
    steps.push_back({
        {"operation", "visit"},
        {"node", u},
        {"visited", vis}
    });
    for (int v : adj[u]) {
        if (!vis[v]) {
            steps.push_back({
                {"operation", "explore"},
                {"from", u},
                {"to", v}
            });
            dfs(v, adj, vis, steps);
        }
    }
}
