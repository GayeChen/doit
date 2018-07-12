# doit

The React-like mini library
> 此库仅供学习，不做任何实际生产用途

## 简单模拟react的实现机制

- 实现基本的createElement和render
- 实现组件的渲染和生命周期
- diff算法
- 异步的setState
- router

## diff算法
- 对比文本节点
- 对比非文本dom节点
- 对比属性
- 对比子节点
    - 将有key的节点和没有key的节点分开
    - 如果有key，找到对应key值的节点；如果没有key，则优先找类型相同的节点
    - 递归对比
    - 更新dom
- 对比组件

## 路由
- 示例
```
<ul className="nav">
    <li><Link to="/">Home Link</Link></li>
    <li><Link to="/about">About Link</Link></li>
    <li><Link to="/topics">Topics, Link</Link></li>
</ul>

    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/topics" component={Topics} />
```  



