#include "dijkstra.hpp"
#include <queue>
void dijkstra(int src, const std::vector<std::vector<std::pair<int,int>>>& g, std::vector<int>& dist, nlohmann::json& steps) {
    int n = g.size();
    dist.assign(n, 1e9);
    dist[src] = 0;
    std::priority_queue<std::pair<int,int>, std::vector<std::pair<int,int>>, std::greater<>> pq;
    pq.push({0, src});
    while(!pq.empty()){
        auto [du,u] = pq.top(); pq.pop();
        steps.push_back({
            {"operation", "extract_min"},
            {"node", u},
            {"distance", du},
            {"distances", dist}
        });
        for (auto [v,w] : g[u]) {
            if (dist[v] > du + w) {
                dist[v] = du + w;
                pq.push({dist[v], v});
                steps.push_back({
                    {"operation", "update"},
                    {"from", u}, {"to", v}, {"new_dist", dist[v]}, {"distances", dist}
                });
            }
        }
    }
}
