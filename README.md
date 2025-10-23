# Theo's Maven Repo

If you want to use one of my java libraries you'd probably want to install my maven repo.

<details open>
<summary>For Groovy DSL:</summary>

```groovy
repositories {
    // ...
    repository {
      name = "Theo's Maven"
      url = "https://theo.is-a.dev/maven"
    }
}
```
</details>

<details>
<summary>For Kotlin DSL:</summary>
  
```kt
repositories {
    // ...
    maven("https://theo.is-a.dev/maven")
}
```
</details>
